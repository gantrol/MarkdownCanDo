import DOMPurify from 'dompurify'
import MarkdownIt from 'markdown-it'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItTaskList from 'markdown-it-task-checkbox'
import { diagramMessages, type UiLocale } from './i18n'

const markdown = new MarkdownIt({
  breaks: false,
  html: true,
  linkify: true,
  typographer: false
})

markdown.use(markdownItFootnote)
markdown.use(markdownItTaskList, { disabled: true })

const defaultFence = markdown.renderer.rules.fence?.bind(markdown.renderer.rules)
const defaultImage = markdown.renderer.rules.image?.bind(markdown.renderer.rules)

markdown.renderer.rules.fence = (tokens, index, options, env, self) => {
  const token = tokens[index]
  const language = token.info.trim().split(/\s+/u)[0]
  const locale = typeof env?.locale === 'string' && env.locale in diagramMessages
    ? env.locale as UiLocale
    : 'en-US'
  const labels = diagramMessages[locale]

  if (language !== 'mermaid' && language !== 'abc') {
    return defaultFence
      ? defaultFence(tokens, index, options, env, self)
      : self.renderToken(tokens, index, options)
  }

  const source = markdown.utils.escapeHtml(token.content)
  if (language === 'abc') {
    return `
      <figure class="md-preview-abc" data-enhancement="abc">
        <div class="md-preview-abc__canvas" role="img" aria-label="${labels.music}"></div>
        <p class="md-preview-abc__status" role="status">${labels.musicLoading}</p>
        <details class="md-preview-abc__source">
          <summary>${labels.musicSource}</summary>
          <pre><code>${source}</code></pre>
        </details>
      </figure>
    `
  }

  return `
    <figure class="md-preview-diagram" data-enhancement="mermaid">
      <div class="md-preview-diagram__canvas" role="img" aria-label="${labels.mermaid}"></div>
      <p class="md-preview-diagram__status" role="status">${labels.mermaidLoading}</p>
      <details class="md-preview-diagram__source">
        <summary>${labels.mermaidSource}</summary>
        <pre><code>${source}</code></pre>
      </details>
    </figure>
  `
}

markdown.renderer.rules.image = (tokens, index, options, env, self) => {
  const token = tokens[index]
  const source = token.attrGet('src') ?? ''
  token.attrSet('loading', 'lazy')
  token.attrSet('decoding', 'async')
  if (source === '/deploy-with-vercel.svg' || source === 'https://vercel.com/button') {
    token.attrSet('width', '103')
    token.attrSet('height', '32')
  } else if (source === '/chatgpt-badge.svg' || source.startsWith('https://img.shields.io/')) {
    token.attrSet('width', '85')
    token.attrSet('height', '28')
  }
  return defaultImage
    ? defaultImage(tokens, index, options, env, self)
    : self.renderToken(tokens, index, options)
}

markdown.renderer.rules.link_open = (tokens, index, options, _env, self) => {
  const token = tokens[index]
  const href = token.attrGet('href') ?? ''

  if (/^(?:https?:)?\/\//iu.test(href)) {
    token.attrSet('target', '_blank')
    token.attrSet('rel', 'noopener noreferrer')
  }

  return self.renderToken(tokens, index, options)
}

markdown.inline.ruler.after('escape', 'math_inline', (state, silent) => {
  const start = state.pos
  if (state.src[start] !== '$' || state.src[start + 1] === '$') return false
  if (/\s/u.test(state.src[start + 1] ?? '')) return false

  let end = start + 1
  while ((end = state.src.indexOf('$', end)) !== -1) {
    if (state.src[end - 1] !== '\\' && !/\s/u.test(state.src[end - 1] ?? '')) break
    end++
  }

  if (end === -1 || end === start + 1) return false

  if (!silent) {
    const token = state.push('math_inline', 'math', 0)
    token.content = state.src.slice(start + 1, end)
  }
  state.pos = end + 1
  return true
})

markdown.block.ruler.after('blockquote', 'math_block', (state, startLine, endLine, silent) => {
  const start = state.bMarks[startLine] + state.tShift[startLine]
  const firstLine = state.src.slice(start, state.eMarks[startLine]).trim()
  if (!firstLine.startsWith('$$')) return false

  let content = firstLine.slice(2)
  let nextLine = startLine
  let closed = content.endsWith('$$')

  if (closed) {
    content = content.slice(0, -2)
  } else {
    const lines: string[] = [content]
    while (++nextLine < endLine) {
      const lineStart = state.bMarks[nextLine] + state.tShift[nextLine]
      const line = state.src.slice(lineStart, state.eMarks[nextLine])
      if (line.trimEnd().endsWith('$$')) {
        lines.push(line.trimEnd().slice(0, -2))
        closed = true
        break
      }
      lines.push(line)
    }
    content = lines.join('\n')
  }

  if (!closed) return false
  if (silent) return true

  const token = state.push('math_block', 'math', 0)
  token.block = true
  token.content = content.trim()
  token.map = [startLine, nextLine + 1]
  state.line = nextLine + 1
  return true
})

markdown.renderer.rules.math_inline = (tokens, index) => {
  const source = markdown.utils.escapeHtml(tokens[index].content)
  return `<span class="md-preview-math" data-enhancement="math"><code>${source}</code></span>`
}

markdown.renderer.rules.math_block = (tokens, index) => {
  const source = markdown.utils.escapeHtml(tokens[index].content)
  return `<div class="md-preview-math md-preview-math--block" data-enhancement="math"><code>${source}</code></div>`
}

export function renderMarkdown(source: string, locale: UiLocale = 'en-US') {
  return DOMPurify.sanitize(markdown.render(source, { locale }), {
    ADD_ATTR: ['target'],
    FORBID_ATTR: ['style'],
    FORBID_TAGS: ['button', 'embed', 'form', 'iframe', 'object', 'option', 'select', 'style', 'textarea'],
    USE_PROFILES: { html: true }
  })
}

export function sanitizeSvg(source: string) {
  return DOMPurify.sanitize(source, {
    ADD_ATTR: ['xmlns'],
    ADD_TAGS: ['foreignObject'],
    USE_PROFILES: { html: true, svg: true, svgFilters: true }
  })
}
