export const IMAGE_API_PATH = '/api/images'
export const IMAGE_PATH_PREFIX = '/uploads/'

export interface ImageKind {
  contentType: 'image/avif' | 'image/gif' | 'image/jpeg' | 'image/png' | 'image/webp'
  extension: 'avif' | 'gif' | 'jpg' | 'png' | 'webp'
}

const textDecoder = new TextDecoder('ascii')

function hasBytes(bytes: Uint8Array, expected: readonly number[], offset = 0) {
  return expected.every((value, index) => bytes[offset + index] === value)
}

function ascii(bytes: Uint8Array, start: number, end: number) {
  return textDecoder.decode(bytes.subarray(start, end))
}

export function detectImageKind(bytes: Uint8Array): ImageKind | undefined {
  if (bytes.length >= 8 && hasBytes(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) {
    return { contentType: 'image/png', extension: 'png' }
  }

  if (bytes.length >= 3 && hasBytes(bytes, [0xff, 0xd8, 0xff])) {
    return { contentType: 'image/jpeg', extension: 'jpg' }
  }

  if (bytes.length >= 6) {
    const signature = ascii(bytes, 0, 6)
    if (signature === 'GIF87a' || signature === 'GIF89a') {
      return { contentType: 'image/gif', extension: 'gif' }
    }
  }

  if (bytes.length >= 12 && ascii(bytes, 0, 4) === 'RIFF' && ascii(bytes, 8, 12) === 'WEBP') {
    return { contentType: 'image/webp', extension: 'webp' }
  }

  if (bytes.length >= 16 && ascii(bytes, 4, 8) === 'ftyp') {
    for (let offset = 8; offset + 4 <= Math.min(bytes.length, 64); offset += 4) {
      const brand = ascii(bytes, offset, offset + 4)
      if (brand === 'avif' || brand === 'avis') {
        return { contentType: 'image/avif', extension: 'avif' }
      }
    }
  }

  return undefined
}

export function utcDay(date = new Date()) {
  return date.toISOString().slice(0, 10)
}

export function utcDayOffset(day: string, offsetDays: number) {
  const date = new Date(`${day}T00:00:00.000Z`)
  date.setUTCDate(date.getUTCDate() + offsetDays)
  return utcDay(date)
}

export function secondsUntilNextUtcDay(now = new Date()) {
  const next = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
  return Math.max(1, Math.ceil((next - now.getTime()) / 1000))
}

export function imageObjectKey(day: string, extension: ImageKind['extension']) {
  return `uploads/${day}/${crypto.randomUUID()}.${extension}`
}

export function imageKeyFromPath(pathname: string) {
  const key = pathname.startsWith('/') ? pathname.slice(1) : pathname
  return /^uploads\/\d{4}-\d{2}-\d{2}\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(?:avif|gif|jpg|png|webp)$/u.test(key)
    ? key
    : undefined
}

export async function readBodyWithLimit(body: ReadableStream<Uint8Array> | null, maxBytes: number) {
  if (!body) return new Uint8Array()

  const reader = body.getReader()
  const chunks: Uint8Array[] = []
  let total = 0

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      total += value.byteLength
      if (total > maxBytes) {
        await reader.cancel('Image exceeds the upload limit')
        return undefined
      }
      chunks.push(value)
    }
  } finally {
    reader.releaseLock()
  }

  const bytes = new Uint8Array(total)
  let offset = 0
  for (const chunk of chunks) {
    bytes.set(chunk, offset)
    offset += chunk.byteLength
  }
  return bytes
}

