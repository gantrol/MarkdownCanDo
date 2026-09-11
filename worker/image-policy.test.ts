import { describe, expect, it } from 'vitest'
import {
  detectImageKind,
  imageKeyFromPath,
  readBodyWithLimit,
  secondsUntilNextUtcDay,
  utcDayOffset
} from './image-policy'

describe('image policy', () => {
  it.each([
    [new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), 'image/png'],
    [new Uint8Array([0xff, 0xd8, 0xff, 0xdb]), 'image/jpeg'],
    [new TextEncoder().encode('GIF89a'), 'image/gif'],
    [new TextEncoder().encode('RIFF0000WEBP'), 'image/webp'],
    [new Uint8Array([0, 0, 0, 24, ...new TextEncoder().encode('ftypavif'), 0, 0, 0, 0]), 'image/avif']
  ])('detects a supported image signature', (bytes, contentType) => {
    expect(detectImageKind(bytes)?.contentType).toBe(contentType)
  })

  it('rejects markup and malformed object paths', () => {
    expect(detectImageKind(new TextEncoder().encode('<svg onload="alert(1)">'))).toBeUndefined()
    expect(imageKeyFromPath('/uploads/2026-08-29/../../secret.png')).toBeUndefined()
    expect(imageKeyFromPath('/uploads/2026-08-29/not-a-uuid.png')).toBeUndefined()
  })

  it('accepts generated object paths only', () => {
    expect(imageKeyFromPath('/uploads/2026-08-29/123e4567-e89b-42d3-a456-426614174000.webp'))
      .toBe('uploads/2026-08-29/123e4567-e89b-42d3-a456-426614174000.webp')
  })

  it('stops reading after the configured byte limit', async () => {
    const body = new Blob([new Uint8Array(9)]).stream()
    await expect(readBodyWithLimit(body, 8)).resolves.toBeUndefined()
  })

  it('uses UTC dates for resets and retention windows', () => {
    expect(utcDayOffset('2026-03-01', -1)).toBe('2026-02-28')
    expect(secondsUntilNextUtcDay(new Date('2026-08-29T23:59:59.500Z'))).toBe(1)
  })
})
