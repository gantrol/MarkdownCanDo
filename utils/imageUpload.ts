export const IMAGE_UPLOAD_ACCEPT = 'image/avif,image/gif,image/jpeg,image/png,image/webp'
export const IMAGE_UPLOAD_MAX_BYTES = 5 * 1024 * 1024

interface UploadPayload {
  url: string
  expiresAt: string
  quota: {
    remainingClientBytes: number
    remainingClientFiles: number
    remainingSiteBytes: number
    remainingSiteFiles: number
    resetsAt: string
  }
}

interface ErrorPayload {
  error?: {
    code?: string
    message?: string
  }
}

export class ImageUploadError extends Error {
  constructor(readonly code: string, message: string, readonly status?: number) {
    super(message)
  }
}

function isUploadPayload(value: unknown): value is UploadPayload {
  if (!value || typeof value !== 'object') return false
  const payload = value as Partial<UploadPayload>
  return typeof payload.url === 'string'
    && typeof payload.expiresAt === 'string'
    && !!payload.quota
    && typeof payload.quota.remainingClientBytes === 'number'
}

export async function uploadImageFile(file: File): Promise<UploadPayload> {
  if (file.size === 0) throw new ImageUploadError('empty_file', 'The image file is empty.')
  if (file.size > IMAGE_UPLOAD_MAX_BYTES) {
    throw new ImageUploadError('file_too_large', 'The image is larger than 5 MiB.')
  }

  let response: Response
  try {
    response = await fetch('/api/images', {
      method: 'POST',
      body: file,
      credentials: 'same-origin',
      headers: {
        'Content-Type': file.type || 'application/octet-stream'
      }
    })
  } catch (error) {
    throw new ImageUploadError(
      'network_error',
      error instanceof Error ? error.message : 'The upload request failed.'
    )
  }

  let payload: unknown
  try {
    payload = await response.json()
  } catch {
    throw new ImageUploadError('invalid_response', 'The image service returned an invalid response.', response.status)
  }

  if (!response.ok) {
    const apiError = (payload as ErrorPayload).error
    throw new ImageUploadError(
      apiError?.code ?? 'upload_failed',
      apiError?.message ?? 'The image could not be uploaded.',
      response.status
    )
  }
  if (!isUploadPayload(payload)) {
    throw new ImageUploadError('invalid_response', 'The image service returned an invalid response.', response.status)
  }
  return payload
}

