export interface LinkCandidate {
  href: string
  label?: string
}

export function parseLinkCandidate(value: string): LinkCandidate | undefined {
  let candidate = value.trim()
  if (!candidate || candidate.length > 2048 || /[\r\n]/u.test(candidate)) return undefined

  const markdownLink = candidate.match(/^\[([^\]\r\n]+)\]\(\s*([^\s)]+)\s*\)$/u)
  if (markdownLink) {
    const parsed = parseLinkCandidate(markdownLink[2])
    return parsed ? { ...parsed, label: markdownLink[1] } : undefined
  }

  if (candidate.startsWith('<') && candidate.endsWith('>')) {
    candidate = candidate.slice(1, -1).trim()
  }

  if (/^(?:www\.)?(?:[\p{L}\p{N}-]+\.)+[\p{L}]{2,}(?::\d+)?(?:[/?#]\S*)?$/u.test(candidate)) {
    candidate = `https://${candidate}`
  }

  try {
    const url = new URL(candidate)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return undefined
    return { href: url.href }
  } catch {
    return undefined
  }
}

export function labelForUrl(href: string) {
  const url = new URL(href)
  const host = url.hostname.replace(/^www\./u, '')
  let path = url.pathname
  try {
    path = decodeURIComponent(path)
  } catch {
    // Keep the encoded path when it cannot be decoded safely.
  }
  path = path.replace(/\/$/u, '')
  return path && path !== '/' ? `${host}${path}` : host
}

export function escapeLinkLabel(value: string) {
  return value.replace(/\\/gu, '\\\\').replace(/\[/gu, '\\[').replace(/\]/gu, '\\]')
}

export function escapeLinkDestination(value: string) {
  // Parentheses are valid in URLs but would otherwise close Markdown's link destination.
  return value.replace(/\(/gu, '%28').replace(/\)/gu, '%29')
}
