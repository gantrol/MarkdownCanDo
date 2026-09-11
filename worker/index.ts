import {
  IMAGE_API_PATH,
  IMAGE_PATH_PREFIX,
  detectImageKind,
  imageKeyFromPath,
  imageObjectKey,
  readBodyWithLimit,
  secondsUntilNextUtcDay,
  utcDay
} from './image-policy'
import { ImageQuota, type QuotaDenialReason } from './quota'

export { ImageQuota }

class HttpError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
    readonly headers?: HeadersInit
  ) {
    super(message)
  }
}

function positiveInteger(value: unknown, name: string) {
  const number = typeof value === 'number' ? value : Number(value)
  if (!Number.isSafeInteger(number) || number <= 0) throw new Error(`Invalid ${name} configuration`)
  return number
}

function apiHeaders(extra?: HeadersInit) {
  const headers = new Headers(extra)
  headers.set('Cache-Control', 'no-store')
  headers.set('Content-Type', 'application/json; charset=utf-8')
  headers.set('X-Content-Type-Options', 'nosniff')
  return headers
}

function json(data: unknown, init: ResponseInit = {}) {
  return Response.json(data, { ...init, headers: apiHeaders(init.headers) })
}

function errorResponse(error: HttpError) {
  return json(
    { error: { code: error.code, message: error.message } },
    { status: error.status, headers: error.headers }
  )
}

function assertUploadSource(request: Request, requestUrl: URL) {
  const origin = request.headers.get('Origin')
  const fetchSite = request.headers.get('Sec-Fetch-Site')
  if (origin !== requestUrl.origin || (fetchSite && fetchSite !== 'same-origin')) {
    throw new HttpError(403, 'origin_forbidden', 'Uploads are only accepted from this site.')
  }
}

function assertImageReadSource(request: Request, requestUrl: URL) {
  const fetchSite = request.headers.get('Sec-Fetch-Site')
  if (fetchSite && fetchSite !== 'same-origin') {
    throw new HttpError(403, 'hotlink_forbidden', 'This image can only be displayed on MarkdownCanDo.')
  }

  const referrer = request.headers.get('Referer')
  if (!referrer) throw new HttpError(403, 'hotlink_forbidden', 'A same-site referrer is required.')

  try {
    if (new URL(referrer).origin !== requestUrl.origin) {
      throw new HttpError(403, 'hotlink_forbidden', 'This image can only be displayed on MarkdownCanDo.')
    }
  } catch (error) {
    if (error instanceof HttpError) throw error
    throw new HttpError(403, 'hotlink_forbidden', 'This image can only be displayed on MarkdownCanDo.')
  }
}

async function clientHash(request: Request, day: string, secret: string) {
  if (typeof secret !== 'string' || secret.length < 32) {
    throw new Error('IMAGE_QUOTA_SECRET must contain at least 32 characters')
  }
  const address = request.headers.get('CF-Connecting-IP') ?? 'local-development'
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(`${day}:${address}`))
  return Array.from(new Uint8Array(signature), byte => byte.toString(16).padStart(2, '0')).join('')
}

function quotaError(reason: QuotaDenialReason) {
  if (reason === 'storage_limit') {
    return new HttpError(507, reason, 'The image store has reached its safe capacity.')
  }
  const message = reason === 'client_daily_limit'
    ? 'Your image upload allowance for today has been used.'
    : "The site's image upload allowance for today has been used."
  return new HttpError(429, reason, message, { 'Retry-After': String(secondsUntilNextUtcDay()) })
}

async function handleUpload(request: Request, env: Env, requestUrl: URL) {
  assertUploadSource(request, requestUrl)

  const maxBytes = positiveInteger(env.IMAGE_MAX_BYTES, 'IMAGE_MAX_BYTES')
  const declaredLength = request.headers.get('Content-Length')
  if (declaredLength && (!/^\d+$/u.test(declaredLength) || Number(declaredLength) > maxBytes)) {
    throw new HttpError(413, 'file_too_large', `Images must not exceed ${maxBytes} bytes.`)
  }

  const bytes = await readBodyWithLimit(request.body, maxBytes)
  if (!bytes) throw new HttpError(413, 'file_too_large', `Images must not exceed ${maxBytes} bytes.`)
  if (bytes.byteLength === 0) throw new HttpError(400, 'empty_file', 'Choose a non-empty image file.')

  const kind = detectImageKind(bytes)
  if (!kind) {
    throw new HttpError(415, 'unsupported_image', 'Only JPEG, PNG, WebP, GIF, and AVIF images are supported.')
  }

  const day = utcDay()
  const hash = await clientHash(request, day, env.IMAGE_QUOTA_SECRET)
  const quota = env.IMAGE_QUOTA.getByName('image-upload-quota')
  const reservation = await quota.reserve(day, hash, bytes.byteLength)
  if (!reservation.allowed) throw quotaError(reservation.reason ?? 'site_daily_limit')

  const key = imageObjectKey(day, kind.extension)
  const retentionDays = positiveInteger(env.IMAGE_RETENTION_DAYS, 'IMAGE_RETENTION_DAYS')
  const uploadedAt = new Date()
  const expiresAt = new Date(uploadedAt.getTime() + retentionDays * 86_400_000)

  try {
    const object = await env.IMAGE_UPLOADS.put(key, bytes, {
      httpMetadata: {
        contentType: kind.contentType,
        contentDisposition: 'inline',
        cacheControl: 'public, max-age=86400, immutable'
      },
      customMetadata: {
        uploadedAt: uploadedAt.toISOString(),
        expiresAt: expiresAt.toISOString()
      }
    })
    if (!object) throw new Error('R2 did not return the uploaded object')
  } catch (error) {
    try {
      await quota.release(day, hash, bytes.byteLength)
    } catch (releaseError) {
      console.error(JSON.stringify({
        message: 'image quota rollback failed',
        error: releaseError instanceof Error ? releaseError.message : String(releaseError),
        day
      }))
    }
    throw error
  }

  const imageUrl = `/${key}`
  return json({
    url: imageUrl,
    expiresAt: expiresAt.toISOString(),
    quota: {
      remainingClientBytes: reservation.remainingClientBytes,
      remainingClientFiles: reservation.remainingClientFiles,
      remainingSiteBytes: reservation.remainingSiteBytes,
      remainingSiteFiles: reservation.remainingSiteFiles,
      resetsAt: new Date(Date.now() + secondsUntilNextUtcDay() * 1000).toISOString()
    }
  }, { status: 201, headers: { Location: imageUrl } })
}

function objectExpiry(object: R2Object, retentionDays: number) {
  const metadataExpiry = Date.parse(object.customMetadata?.expiresAt ?? '')
  return Number.isFinite(metadataExpiry)
    ? metadataExpiry
    : object.uploaded.getTime() + retentionDays * 86_400_000
}

function mediaHeaders(object: R2ObjectBody, expiresAt: number) {
  const headers = new Headers()
  object.writeHttpMetadata(headers)
  const remainingSeconds = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000))
  headers.set('Cache-Control', `public, max-age=${Math.min(86_400, remainingSeconds)}, immutable`)
  headers.set('Content-Security-Policy', "default-src 'none'; sandbox")
  headers.set('Cross-Origin-Resource-Policy', 'same-origin')
  headers.set('ETag', object.httpEtag)
  headers.set('Expires', new Date(expiresAt).toUTCString())
  headers.set('Last-Modified', object.uploaded.toUTCString())
  headers.set('Vary', 'Referer, Sec-Fetch-Site')
  headers.set('X-Image-Expires-At', new Date(expiresAt).toISOString())
  headers.set('X-Content-Type-Options', 'nosniff')
  return headers
}

function cachedImageExpiry(response: Response) {
  const expiresAt = Date.parse(response.headers.get('X-Image-Expires-At') ?? '')
  return Number.isFinite(expiresAt) ? expiresAt : undefined
}

function responseFromCached(request: Request, cached: Response) {
  const etag = cached.headers.get('ETag')
  if (etag && request.headers.get('If-None-Match') === etag) {
    return new Response(null, { status: 304, headers: cached.headers })
  }
  if (request.method === 'HEAD') {
    return new Response(null, { status: cached.status, headers: cached.headers })
  }
  return cached
}

async function handleImageRead(request: Request, env: Env, ctx: ExecutionContext, requestUrl: URL) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    throw new HttpError(405, 'method_not_allowed', 'Only GET and HEAD are supported.', { Allow: 'GET, HEAD' })
  }
  assertImageReadSource(request, requestUrl)

  const key = imageKeyFromPath(requestUrl.pathname)
  if (!key) throw new HttpError(404, 'image_not_found', 'Image not found.')

  const cacheUrl = new URL(requestUrl)
  cacheUrl.search = ''
  const cacheKey = new Request(cacheUrl.href, { method: 'GET' })
  const cached = await caches.default.match(cacheKey)
  if (cached) {
    const cachedExpiresAt = cachedImageExpiry(cached)
    if (cachedExpiresAt && cachedExpiresAt > Date.now()) return responseFromCached(request, cached)
    await caches.default.delete(cacheKey)
    if (cachedExpiresAt !== undefined) {
      ctx.waitUntil(env.IMAGE_UPLOADS.delete(key))
      throw new HttpError(404, 'image_not_found', 'Image not found.')
    }
  }

  const object = await env.IMAGE_UPLOADS.get(key)
  if (!object) throw new HttpError(404, 'image_not_found', 'Image not found.')

  const expiresAt = objectExpiry(object, positiveInteger(env.IMAGE_RETENTION_DAYS, 'IMAGE_RETENTION_DAYS'))
  if (expiresAt <= Date.now()) {
    ctx.waitUntil(env.IMAGE_UPLOADS.delete(key))
    throw new HttpError(404, 'image_not_found', 'Image not found.')
  }

  const response = new Response(object.body, { headers: mediaHeaders(object, expiresAt) })
  ctx.waitUntil(caches.default.put(cacheKey, response.clone()))
  return responseFromCached(request, response)
}

async function route(request: Request, env: Env, ctx: ExecutionContext) {
  const requestUrl = new URL(request.url)
  if (requestUrl.pathname === IMAGE_API_PATH) {
    if (request.method !== 'POST') {
      throw new HttpError(405, 'method_not_allowed', 'Only POST is supported.', { Allow: 'POST' })
    }
    return handleUpload(request, env, requestUrl)
  }
  if (requestUrl.pathname.startsWith(IMAGE_PATH_PREFIX)) {
    return handleImageRead(request, env, ctx, requestUrl)
  }
  return env.ASSETS.fetch(request)
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    try {
      return await route(request, env, ctx)
    } catch (error) {
      if (error instanceof HttpError) return errorResponse(error)
      console.error(JSON.stringify({
        message: 'image request failed',
        error: error instanceof Error ? error.message : String(error),
        method: request.method,
        path: new URL(request.url).pathname
      }))
      return errorResponse(new HttpError(500, 'internal_error', 'The image service is temporarily unavailable.'))
    }
  }
} satisfies ExportedHandler<Env>
