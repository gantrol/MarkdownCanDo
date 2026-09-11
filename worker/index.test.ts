import { SELF, env, runDurableObjectAlarm, runInDurableObject } from 'cloudflare:test'
import { describe, expect, it } from 'vitest'

const origin = 'https://markdown.aicando.xyz'
const png = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0])

function upload(ip: string, body: BodyInit = png, requestOrigin = origin) {
  return SELF.fetch(`${origin}/api/images`, {
    method: 'POST',
    body,
    headers: {
      'CF-Connecting-IP': ip,
      'Content-Type': 'image/png',
      Origin: requestOrigin,
      'Sec-Fetch-Site': requestOrigin === origin ? 'same-origin' : 'cross-site'
    }
  })
}

async function uploadUrl(ip: string) {
  const response = await upload(ip)
  expect(response.status).toBe(201)
  const path = (await response.json<{ url: string }>()).url
  expect(path).toMatch(/^\/uploads\//u)
  return new URL(path, origin).href
}

describe('image upload Worker', () => {
  it('uploads a signed image to private R2 and serves it only to this site', async () => {
    const url = await uploadUrl('203.0.113.10')

    const sameSite = await SELF.fetch(url, {
      headers: {
        Referer: `${origin}/playground/`,
        'Sec-Fetch-Site': 'same-origin'
      }
    })
    expect(sameSite.status).toBe(200)
    expect(sameSite.headers.get('Cross-Origin-Resource-Policy')).toBe('same-origin')
    expect(sameSite.headers.get('Access-Control-Allow-Origin')).toBeNull()
    const etag = sameSite.headers.get('ETag')
    expect(new Uint8Array(await sameSite.arrayBuffer())).toEqual(png)

    const head = await SELF.fetch(url, {
      method: 'HEAD',
      headers: {
        Referer: `${origin}/playground/`,
        'Sec-Fetch-Site': 'same-origin'
      }
    })
    expect(head.status).toBe(200)
    expect((await head.arrayBuffer()).byteLength).toBe(0)

    const notModified = await SELF.fetch(url, {
      headers: {
        Referer: `${origin}/playground/`,
        'Sec-Fetch-Site': 'same-origin',
        'If-None-Match': etag ?? ''
      }
    })
    expect(notModified.status).toBe(304)

    const hotlink = await SELF.fetch(url, {
      headers: {
        Referer: 'https://example.com/article',
        'Sec-Fetch-Site': 'cross-site'
      }
    })
    expect(hotlink.status).toBe(403)
    await expect(hotlink.json<{ error: { code: string } }>()).resolves.toMatchObject({
      error: { code: 'hotlink_forbidden' }
    })

    expect((await SELF.fetch(url)).status).toBe(403)
  })

  it('rejects uploads from another origin', async () => {
    const response = await upload('203.0.113.11', png, 'https://example.com')
    expect(response.status).toBe(403)
    expect(response.headers.get('Access-Control-Allow-Origin')).toBeNull()
    expect((await SELF.fetch(`${origin}/api/images`, { method: 'POST', body: png })).status).toBe(403)
  })

  it('rejects SVG and payloads above the per-file limit', async () => {
    const svg = await upload('203.0.113.12', new TextEncoder().encode('<svg/>'))
    expect(svg.status).toBe(415)

    const oversized = await upload('203.0.113.13', new Uint8Array(5 * 1024 * 1024 + 1))
    expect(oversized.status).toBe(413)
  })

  it('enforces the per-client daily file limit under concurrent uploads', async () => {
    const responses = await Promise.all(
      Array.from({ length: 12 }, () => upload('203.0.113.99'))
    )
    expect(responses.filter(response => response.status === 201)).toHaveLength(10)
    expect(responses.filter(response => response.status === 429)).toHaveLength(2)
  })

  it('enforces both site-wide daily file and byte limits', async () => {
    const fileQuota = env.IMAGE_QUOTA.getByName('site-file-limit-test')
    for (let index = 0; index < 300; index++) {
      const hash = index.toString(16).padStart(64, '0')
      expect((await fileQuota.reserve('2026-08-29', hash, 1)).allowed).toBe(true)
    }
    expect((await fileQuota.reserve('2026-08-29', 'f'.repeat(64), 1)).reason)
      .toBe('site_daily_limit')

    const byteQuota = env.IMAGE_QUOTA.getByName('site-byte-limit-test')
    for (let index = 0; index < 51; index++) {
      const hash = (index + 100).toString(16).padStart(64, '0')
      expect((await byteQuota.reserve('2026-08-29', hash, 20 * 1024 * 1024)).allowed).toBe(true)
    }
    expect((await byteQuota.reserve('2026-08-29', 'd'.repeat(64), 4 * 1024 * 1024)).allowed)
      .toBe(true)
    expect((await byteQuota.reserve('2026-08-29', 'e'.repeat(64), 1)).reason)
      .toBe('site_daily_limit')
  })

  it('expires cached and R2 image access at the application deadline', async () => {
    const expiredKey = 'uploads/2026-08-29/123e4567-e89b-42d3-a456-426614174000.png'
    await env.IMAGE_UPLOADS.put(expiredKey, png, {
      httpMetadata: { contentType: 'image/png' },
      customMetadata: { expiresAt: '2020-01-01T00:00:00.000Z' }
    })
    const headers = {
      Referer: `${origin}/playground/`,
      'Sec-Fetch-Site': 'same-origin'
    }
    expect((await SELF.fetch(`${origin}/${expiredKey}`, { headers })).status).toBe(404)

    const shortKey = 'uploads/2026-08-29/223e4567-e89b-42d3-a456-426614174000.png'
    await env.IMAGE_UPLOADS.put(shortKey, png, {
      httpMetadata: { contentType: 'image/png' },
      customMetadata: { expiresAt: new Date(Date.now() + 60_000).toISOString() }
    })
    const shortResponse = await SELF.fetch(`${origin}/${shortKey}`, { headers })
    expect(shortResponse.status).toBe(200)
    const maxAge = Number(shortResponse.headers.get('Cache-Control')?.match(/max-age=(\d+)/u)?.[1])
    expect(maxAge).toBeGreaterThan(0)
    expect(maxAge).toBeLessThanOrEqual(60)
  })

  it('rejects malformed upload object paths', async () => {
    const response = await SELF.fetch(`${origin}/uploads/2026-08-29/not-a-uuid.png`, {
      headers: {
        Referer: `${origin}/playground/`,
        'Sec-Fetch-Site': 'same-origin'
      }
    })
    expect(response.status).toBe(404)
  })

  it('releases a quota reservation explicitly', async () => {
    const quota = env.IMAGE_QUOTA.getByName('release-test')
    const hash = 'a'.repeat(64)
    const first = await quota.reserve('2026-08-29', hash, 20 * 1024 * 1024)
    expect(first.allowed).toBe(true)
    expect((await quota.reserve('2026-08-29', hash, 1)).reason).toBe('client_daily_limit')

    await quota.release('2026-08-29', hash, 20 * 1024 * 1024)
    expect((await quota.reserve('2026-08-29', hash, 1)).allowed).toBe(true)
  })

  it('uses a daily alarm to remove expired quota identifiers', async () => {
    const quota = env.IMAGE_QUOTA.getByName('alarm-cleanup-test')
    expect((await quota.reserve('2026-01-01', 'b'.repeat(64), 1)).allowed).toBe(true)
    expect(await runDurableObjectAlarm(quota)).toBe(true)
    const count = await runInDurableObject(quota, (_instance, state) => (
      state.storage.sql.exec('SELECT COUNT(*) AS count FROM daily_usage').one().count as number
    ))
    expect(count).toBe(0)
  })

  it('keeps a three-day quota ledger independently of image availability', async () => {
    const quota = env.IMAGE_QUOTA.getByName('three-day-ledger-test')
    const hash = 'c'.repeat(64)
    for (const day of ['2026-08-26', '2026-08-27', '2026-08-28', '2026-08-29']) {
      expect((await quota.reserve(day, hash, 1)).allowed).toBe(true)
    }
    const days = await runInDurableObject(quota, (_instance, state) => (
      state.storage.sql.exec('SELECT DISTINCT day FROM daily_usage ORDER BY day')
        .toArray()
        .map(row => row.day as string)
    ))
    expect(days).toEqual(['2026-08-27', '2026-08-28', '2026-08-29'])
  })
})
