<script setup lang="ts">
import { computed, defineAsyncComponent, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { editorMessages, getUiLocale, type UiLocale } from '../utils/i18n'
import { renderMarkdown, sanitizeSvg } from '../utils/markdown'

type ViewMode = 'edit' | 'wysiwyg' | 'split' | 'preview'
type LegacyMode = ViewMode | 'ir' | 'sv' | 'wysiwyg'

interface EditorOptions {
  height?: number | string
  mode?: LegacyMode
  preview?: {
    delay?: number
  }
}

const props = withDefaults(defineProps<{
  id: string
  text?: string
  options?: EditorOptions
}>(), {
  text: '',
  options: () => ({})
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const MarkdownWysiwyg = defineAsyncComponent(() => import('./MarkdownWysiwyg.vue'))

const root = ref<HTMLElement>()
const input = ref<HTMLTextAreaElement>()
const preview = ref<HTMLElement>()
const source = ref(props.text)
const previewHtml = ref('')
const previewDirty = ref(true)
const locale = ref<UiLocale>('en')
const viewMode = ref<ViewMode>('split')
const copyState = ref<'idle' | 'copied'>('idle')

let renderTimer: ReturnType<typeof setTimeout> | undefined
let copyTimer: ReturnType<typeof setTimeout> | undefined
let enhancementObserver: IntersectionObserver | undefined
let themeObserver: MutationObserver | undefined
let mediaQuery: MediaQueryList | undefined
let renderVersion = 0
let diagramId = 0
let userSelectedMode = false

const messages = computed(() => editorMessages[locale.value])
const editorTitleId = computed(() => `${props.id}-title`)
const inputId = computed(() => `${props.id}-input`)
const previewId = computed(() => `${props.id}-preview`)
const rootStyle = computed(() => {
  const height = props.options.height
  if (!height) return undefined
  return {
    '--md-editor-height': typeof height === 'number' ? `${height}px` : height
  }
})

const stats = computed(() => {
  const characters = source.value.length
  const lines = source.value ? source.value.split(/\r?\n/u).length : 1
  const words = source.value.trim().match(/[\p{L}\p{N}]+/gu)?.length ?? 0
  return messages.value.stats(lines, words, characters)
})

const toolbarItems = computed(() => [
  { key: 'heading', icon: 'H', label: messages.value.heading, action: () => prefixLines('## ') },
  { key: 'bold', icon: 'B', label: messages.value.bold, shortcut: 'Control+B', action: () => wrapSelection('**', '**', 'bold text') },
  { key: 'italic', icon: 'I', label: messages.value.italic, shortcut: 'Control+I', action: () => wrapSelection('*', '*', 'italic text') },
  { key: 'strike', icon: 'S', label: messages.value.strike, action: () => wrapSelection('~~', '~~', 'strikethrough') },
  { key: 'link', icon: '↗', label: messages.value.link, shortcut: 'Control+K', action: insertLink },
  { key: 'bullet-list', icon: '•', label: messages.value.bulletList, action: () => prefixLines('- ') },
  { key: 'ordered-list', icon: '1.', label: `1. ${messages.value.orderedList}`, action: () => prefixLines((_line, index) => `${index + 1}. `) },
  { key: 'task-list', icon: '☑', label: messages.value.taskList, action: () => prefixLines('- [ ] ') },
  { key: 'quote', icon: '❯', label: messages.value.quote, action: () => prefixLines('> ') },
  { key: 'code', icon: '</>', label: messages.value.code, action: insertCode },
  { key: 'table', icon: '▦', label: messages.value.table, action: insertTable },
  { key: 'rule', icon: '—', label: messages.value.rule, action: () => insertBlock('\n---\n') }
])

const viewItems = computed(() => [
  { mode: 'edit' as const, label: messages.value.edit, icon: '✎' },
  { mode: 'wysiwyg' as const, label: messages.value.wysiwyg, icon: 'W' },
  { mode: 'split' as const, label: messages.value.split, icon: '◫' },
  { mode: 'preview' as const, label: messages.value.previewOnly, icon: '◉' }
])

const wysiwygToolbarLabels = computed(() => [
  messages.value.bold,
  messages.value.italic,
  messages.value.strike,
  messages.value.inlineCode,
  messages.value.link,
  messages.value.table,
  messages.value.codeBlock,
  messages.value.math,
  messages.value.quote,
  messages.value.rule,
  messages.value.bulletList,
  messages.value.orderedList,
  messages.value.taskList
])

watch(() => props.text, (value) => {
  if (value !== source.value) source.value = value ?? ''
})

watch(source, (value) => {
  emit('update:modelValue', value)
  previewDirty.value = true
  if (viewMode.value === 'split' || viewMode.value === 'preview') schedulePreview()
})

function schedulePreview(immediate = false) {
  if (renderTimer) clearTimeout(renderTimer)
  const delay = immediate ? 0 : Math.max(80, props.options.preview?.delay ?? 220)
  renderTimer = setTimeout(() => void updatePreview(), delay)
}

async function updatePreview() {
  const version = ++renderVersion
  previewHtml.value = renderMarkdown(source.value)
  previewDirty.value = false
  await nextTick()
  if (version !== renderVersion) return
  observeEnhancements()
}

function observeEnhancements() {
  enhancementObserver?.disconnect()
  const elements = preview.value?.querySelectorAll<HTMLElement>('[data-enhancement]') ?? []
  if (!elements.length) return

  if ('IntersectionObserver' in window) {
    enhancementObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const element = entry.target as HTMLElement
        element.dataset.visible = 'true'
        enhancementObserver?.unobserve(element)
        void enhance(element)
      }
    }, { root: preview.value, rootMargin: '80px 0px' })
    elements.forEach(element => enhancementObserver?.observe(element))
  } else {
    elements.forEach(element => void enhance(element))
  }
}

async function enhance(element: HTMLElement) {
  if (element.dataset.enhancing === 'true') return
  element.dataset.enhancing = 'true'
  try {
    if (element.dataset.enhancement === 'math') await renderMath(element)
    if (element.dataset.enhancement === 'mermaid') await renderMermaid(element)
    if (element.dataset.enhancement === 'abc') await renderAbc(element)
    element.dataset.enhanced = 'true'
  } finally {
    delete element.dataset.enhancing
  }
}

async function renderMath(element: HTMLElement) {
  const code = element.querySelector('code')?.textContent ?? element.dataset.source ?? ''
  if (!code) return
  element.dataset.source = code

  const [{ default: katex }] = await Promise.all([
    import('katex'),
    import('katex/dist/katex.min.css')
  ])
  katex.render(code, element, {
    displayMode: element.classList.contains('md-preview-math--block'),
    output: 'htmlAndMathml',
    strict: 'warn',
    throwOnError: false,
    trust: false
  })
}

async function renderMermaid(element: HTMLElement) {
  const canvas = element.querySelector<HTMLElement>('.md-preview-diagram__canvas')
  const status = element.querySelector<HTMLElement>('.md-preview-diagram__status')
  const code = element.querySelector('code')?.textContent ?? ''
  if (!canvas || !code) return

  status?.removeAttribute('hidden')
  const { default: mermaid } = await import('mermaid')
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    suppressErrorRendering: true,
    theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default'
  })

  try {
    const result = await mermaid.render(`markdown-editor-diagram-${++diagramId}`, code)
    canvas.innerHTML = sanitizeSvg(result.svg)
    status?.setAttribute('hidden', '')
  } catch (error) {
    canvas.replaceChildren()
    if (status) status.textContent = 'Diagram syntax error. The source is available below.'
    console.warn('[MarkdownCanDo] Mermaid preview failed.', error)
  }
}

async function renderAbc(element: HTMLElement) {
  const canvas = element.querySelector<HTMLElement>('.md-preview-abc__canvas')
  const status = element.querySelector<HTMLElement>('.md-preview-abc__status')
  const code = element.querySelector('code')?.textContent ?? ''
  if (!canvas || !code) return

  try {
    const abcjs = await import('abcjs')
    abcjs.renderAbc(canvas, code, {
      add_classes: true,
      responsive: 'resize'
    })
    canvas.innerHTML = sanitizeSvg(canvas.innerHTML)
    status?.setAttribute('hidden', '')
  } catch (error) {
    canvas.replaceChildren()
    if (status) status.textContent = 'Music syntax error. The source is available below.'
    console.warn('[MarkdownCanDo] ABC preview failed.', error)
  }
}

function setViewMode(mode: ViewMode) {
  userSelectedMode = true
  viewMode.value = mode
  if (mode === 'split' || mode === 'preview') {
    if (previewDirty.value) schedulePreview(true)
    else void nextTick(observeEnhancements)
  }
}

function syncResponsiveMode(event: MediaQueryList | MediaQueryListEvent) {
  if (event.matches) {
    if (viewMode.value === 'split') viewMode.value = 'edit'
    return
  }
  if (userSelectedMode) return
  viewMode.value = preferredDesktopMode()
  if ((viewMode.value === 'split' || viewMode.value === 'preview') && previewDirty.value) schedulePreview(true)
}

function preferredDesktopMode(): ViewMode {
  if (props.options.mode === 'edit') return 'edit'
  if (props.options.mode === 'preview') return 'preview'
  if (props.options.mode === 'wysiwyg' || props.options.mode === 'ir') return 'wysiwyg'
  return 'split'
}

function handleInput(event: Event) {
  source.value = (event.target as HTMLTextAreaElement).value
}

function handleWysiwygInput(value: string) {
  source.value = value
}

function replaceSelection(replacement: string, selectionStart: number, selectionEnd: number) {
  if (input.value) {
    input.value.focus()
    input.value.setSelectionRange(selectionStart, selectionEnd)
    const inserted = document.execCommand?.('insertText', false, replacement) ?? false
    if (!inserted) {
      input.value.setRangeText(replacement, selectionStart, selectionEnd, 'end')
    }
    source.value = input.value.value
    return
  }
  source.value = source.value.slice(0, selectionStart) + replacement + source.value.slice(selectionEnd)
}

function wrapSelection(before: string, after: string, placeholder: string) {
  const element = input.value
  if (!element) return
  const start = element.selectionStart
  const end = element.selectionEnd
  const selected = source.value.slice(start, end) || placeholder
  replaceSelection(`${before}${selected}${after}`, start, end)
  void nextTick(() => {
    element.focus()
    element.setSelectionRange(start + before.length, start + before.length + selected.length)
  })
}

function prefixLines(prefix: string | ((line: string, index: number) => string)) {
  const element = input.value
  if (!element) return
  const selectionStart = source.value.lastIndexOf('\n', element.selectionStart - 1) + 1
  const nextBreak = source.value.indexOf('\n', element.selectionEnd)
  const selectionEnd = nextBreak === -1 ? source.value.length : nextBreak
  const lines = source.value.slice(selectionStart, selectionEnd).split('\n')
  const replacement = lines.map((line, index) => `${typeof prefix === 'function' ? prefix(line, index) : prefix}${line}`).join('\n')
  replaceSelection(replacement, selectionStart, selectionEnd)
  void nextTick(() => {
    element.focus()
    element.setSelectionRange(selectionStart, selectionStart + replacement.length)
  })
}

function insertLink() {
  const element = input.value
  if (!element) return
  const start = element.selectionStart
  const end = element.selectionEnd
  const selected = source.value.slice(start, end) || 'link text'
  const replacement = `[${selected}](https://)`
  replaceSelection(replacement, start, end)
  void nextTick(() => {
    element.focus()
    element.setSelectionRange(start + selected.length + 3, start + selected.length + 11)
  })
}

function insertCode() {
  const element = input.value
  const selected = element ? source.value.slice(element.selectionStart, element.selectionEnd) : ''
  if (selected.includes('\n')) wrapSelection('```\n', '\n```', selected)
  else wrapSelection('`', '`', 'code')
}

function insertTable() {
  insertBlock('\n| Column 1 | Column 2 |\n| --- | --- |\n| Value 1 | Value 2 |\n')
}

function insertBlock(block: string) {
  const element = input.value
  if (!element) return
  const start = element.selectionStart
  replaceSelection(block, start, element.selectionEnd)
  void nextTick(() => {
    element.focus()
    element.setSelectionRange(start + block.length, start + block.length)
  })
}

function handleShortcut(event: KeyboardEvent) {
  if (!(event.ctrlKey || event.metaKey)) return
  const key = event.key.toLowerCase()
  if (!['b', 'i', 'k'].includes(key)) return
  event.preventDefault()
  if (key === 'b') wrapSelection('**', '**', 'bold text')
  if (key === 'i') wrapSelection('*', '*', 'italic text')
  if (key === 'k') insertLink()
}

async function copyMarkdown() {
  try {
    await navigator.clipboard.writeText(source.value)
    copyState.value = 'copied'
    if (copyTimer) clearTimeout(copyTimer)
    copyTimer = setTimeout(() => { copyState.value = 'idle' }, 1600)
  } catch (error) {
    console.warn('[MarkdownCanDo] Copy failed.', error)
  }
}

async function toggleFullscreen() {
  if (!root.value) return
  try {
    if (document.fullscreenElement) await document.exitFullscreen()
    else await root.value.requestFullscreen()
  } catch (error) {
    console.warn('[MarkdownCanDo] Fullscreen is unavailable.', error)
  }
}

onMounted(() => {
  locale.value = getUiLocale()
  mediaQuery = window.matchMedia('(max-width: 767px)')
  syncResponsiveMode(mediaQuery)
  mediaQuery.addEventListener('change', syncResponsiveMode)
  if (viewMode.value === 'split' || viewMode.value === 'preview') schedulePreview(true)

  themeObserver = new MutationObserver(() => {
    preview.value
      ?.querySelectorAll<HTMLElement>('[data-enhancement="mermaid"][data-visible="true"]')
      .forEach(element => void renderMermaid(element))
  })
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})

onBeforeUnmount(() => {
  renderVersion++
  if (renderTimer) clearTimeout(renderTimer)
  if (copyTimer) clearTimeout(copyTimer)
  enhancementObserver?.disconnect()
  themeObserver?.disconnect()
  mediaQuery?.removeEventListener('change', syncResponsiveMode)
})
</script>

<template>
  <section
    :id="id"
    ref="root"
    class="markdown-editor"
    :class="`markdown-editor--${viewMode}`"
    :style="rootStyle"
    :aria-labelledby="editorTitleId"
  >
    <h2 :id="editorTitleId" class="sr-only">{{ messages.editor }}</h2>

    <div class="markdown-editor__toolbar" role="toolbar" :aria-label="messages.editor">
      <div v-show="viewMode !== 'wysiwyg'" class="markdown-editor__formatting-tools">
        <button
          v-for="item in toolbarItems"
          :key="item.key"
          type="button"
          class="markdown-editor__tool"
          :class="`markdown-editor__tool--${item.key}`"
          :aria-label="item.label"
          :aria-keyshortcuts="item.shortcut"
          :title="item.label"
          @mousedown.prevent
          @click="item.action"
        >
          <span aria-hidden="true">{{ item.icon }}</span>
        </button>
      </div>

      <div class="markdown-editor__toolbar-actions">
        <div class="markdown-editor__view-switcher" role="group" :aria-label="messages.split">
          <button
            v-for="item in viewItems"
            :key="item.mode"
            type="button"
            class="markdown-editor__tool"
            :class="[`markdown-editor__view--${item.mode}`, { 'is-active': viewMode === item.mode }]"
            :aria-label="item.label"
            :aria-pressed="viewMode === item.mode"
            :title="item.label"
            @click="setViewMode(item.mode)"
          >
            <span aria-hidden="true">{{ item.icon }}</span>
          </button>
        </div>

        <button
          type="button"
          class="markdown-editor__tool"
          :aria-label="copyState === 'copied' ? messages.copied : messages.copy"
          :title="messages.copy"
          @click="copyMarkdown"
        >
          <span aria-hidden="true">{{ copyState === 'copied' ? '✓' : '⧉' }}</span>
        </button>
        <button
          type="button"
          class="markdown-editor__tool markdown-editor__fullscreen"
          :aria-label="messages.fullscreen"
          :title="messages.fullscreen"
          @click="toggleFullscreen"
        >
          <span aria-hidden="true">⛶</span>
        </button>
      </div>
    </div>

    <div class="markdown-editor__body">
      <div v-show="viewMode === 'edit' || viewMode === 'split'" class="markdown-editor__source-pane">
        <label class="sr-only" :for="inputId">{{ messages.source }}</label>
        <textarea
          :id="inputId"
          ref="input"
          class="markdown-editor__input"
          :value="source"
          :aria-describedby="`${id}-stats`"
          autocomplete="off"
          autocapitalize="off"
          autocorrect="off"
          spellcheck="true"
          @input="handleInput"
          @keydown="handleShortcut"
        />
      </div>

      <section
        v-show="viewMode === 'preview' || viewMode === 'split'"
        :id="previewId"
        ref="preview"
        class="markdown-editor__preview"
        :aria-label="messages.preview"
        tabindex="0"
      >
        <div class="vp-doc markdown-editor__preview-content" v-html="previewHtml" />
      </section>

      <div v-if="viewMode === 'wysiwyg'" class="markdown-editor__wysiwyg-pane">
        <Suspense>
          <MarkdownWysiwyg
            :model-value="source"
            :loading-label="messages.loadingWysiwyg"
            :error-label="messages.wysiwygError"
            :toolbar-labels="wysiwygToolbarLabels"
            @update:model-value="handleWysiwygInput"
          />
          <template #fallback>
            <div class="markdown-editor__loading" role="status" aria-live="polite">
              {{ messages.loadingWysiwyg }}
            </div>
          </template>
        </Suspense>
      </div>
    </div>

    <footer class="markdown-editor__statusbar">
      <span :id="`${id}-stats`">{{ stats }}</span>
      <span class="markdown-editor__copy-status" role="status" aria-live="polite">
        {{ copyState === 'copied' ? messages.copied : '' }}
      </span>
    </footer>
  </section>
</template>

<style>
.markdown-editor {
  --md-editor-height: min(78dvh, 820px);
  display: flex;
  width: 100%;
  min-width: 0;
  height: var(--md-editor-height);
  min-height: 520px;
  overflow: hidden;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  box-shadow: var(--vp-shadow-2);
}

.markdown-editor:fullscreen {
  --md-editor-height: 100dvh;
  border: 0;
  border-radius: 0;
}

.markdown-editor__toolbar {
  display: flex;
  min-height: 46px;
  padding: 3px 6px;
  overflow: hidden;
  align-items: center;
  gap: 2px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.markdown-editor__formatting-tools,
.markdown-editor__toolbar-actions,
.markdown-editor__view-switcher {
  display: flex;
  align-items: center;
  gap: 2px;
}

.markdown-editor__formatting-tools {
  min-width: 0;
  overflow-x: auto;
  flex: 1;
  scrollbar-width: none;
}

.markdown-editor__formatting-tools::-webkit-scrollbar {
  display: none;
}

.markdown-editor__toolbar-actions {
  padding-left: 5px;
  margin-left: auto;
  border-left: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.markdown-editor__tool {
  display: inline-grid;
  width: 40px;
  min-width: 40px;
  height: 40px;
  padding: 0;
  place-items: center;
  border: 0;
  border-radius: 8px;
  color: var(--vp-c-text-2);
  background: transparent;
  font: 600 14px/1 var(--vp-font-family-base);
  cursor: pointer;
}

.markdown-editor__tool:hover,
.markdown-editor__tool.is-active {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.markdown-editor__tool:focus-visible,
.markdown-editor__input:focus-visible,
.markdown-editor__preview:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}

.markdown-editor__tool--italic {
  font-style: italic;
}

.markdown-editor__tool--strike {
  text-decoration: line-through;
}

.markdown-editor__body {
  display: grid;
  min-width: 0;
  min-height: 0;
  flex: 1;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}

.markdown-editor__source-pane,
.markdown-editor__preview,
.markdown-editor__wysiwyg-pane {
  min-width: 0;
  min-height: 0;
}

.markdown-editor__wysiwyg-pane {
  overflow: hidden;
}

.markdown-editor__loading {
  display: grid;
  height: 100%;
  padding: 24px;
  place-items: center;
  color: var(--vp-c-text-2);
}

.markdown-editor__source-pane {
  overflow: hidden;
  border-right: 1px solid var(--vp-c-divider);
}

.markdown-editor__input {
  display: block;
  width: 100%;
  height: 100%;
  padding: 20px;
  resize: none;
  border: 0;
  border-radius: 0;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  caret-color: var(--vp-c-brand-1);
  font: 14px/1.65 var(--vp-font-family-mono);
  tab-size: 2;
}

.markdown-editor__preview {
  overflow: auto;
  overscroll-behavior: contain;
  background: var(--vp-c-bg);
}

.markdown-editor__preview-content {
  max-width: 860px;
  padding: 20px 24px 48px;
  margin: 0 auto;
}

.markdown-editor__preview-content > :first-child {
  margin-top: 0;
}

.markdown-editor__preview-content img {
  max-width: 100%;
}

.markdown-editor__preview-content .task-list-item {
  list-style: none;
}

.markdown-editor__preview-content .md-preview-math {
  max-width: 100%;
  overflow-x: auto;
}

.markdown-editor__preview-content .md-preview-math > code {
  color: var(--vp-c-text-1);
  background: var(--vp-c-default-soft);
}

.markdown-editor__preview-content .md-preview-math--block {
  margin: 18px 0;
  text-align: center;
}

.markdown-editor__preview-content .md-preview-diagram,
.markdown-editor__preview-content .md-preview-abc {
  min-height: 140px;
  margin: 20px 0;
  padding: 14px;
  overflow: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

.markdown-editor__preview-content .md-preview-diagram__canvas svg,
.markdown-editor__preview-content .md-preview-abc__canvas svg {
  display: block;
  max-width: 100%;
  height: auto;
  margin: auto;
}

.markdown-editor__preview-content .md-preview-diagram__status,
.markdown-editor__preview-content .md-preview-abc__status {
  display: grid;
  min-height: 110px;
  margin: 0;
  place-items: center;
  color: var(--vp-c-text-2);
}

.markdown-editor__preview-content .md-preview-diagram__source,
.markdown-editor__preview-content .md-preview-abc__source {
  margin-top: 12px;
  font-size: 13px;
}

.markdown-editor__statusbar {
  display: flex;
  min-height: 30px;
  padding: 0 12px;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  font-size: 12px;
}

.markdown-editor--edit .markdown-editor__body,
.markdown-editor--preview .markdown-editor__body,
.markdown-editor--wysiwyg .markdown-editor__body {
  grid-template-columns: minmax(0, 1fr);
}

.markdown-editor--edit .markdown-editor__preview,
.markdown-editor--preview .markdown-editor__source-pane {
  display: none;
}

.markdown-editor--preview .markdown-editor__source-pane,
.markdown-editor--edit .markdown-editor__preview {
  border-right: 0;
}

.sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

@media (max-width: 767px) {
  .markdown-editor {
    --md-editor-height: 70dvh;
    min-height: 500px;
    border-radius: 10px;
  }

  .markdown-editor__tool {
    width: 44px;
    min-width: 44px;
    height: 44px;
  }

  .markdown-editor__view--split,
  .markdown-editor__fullscreen {
    display: none;
  }

  .markdown-editor__input,
  .markdown-editor__preview-content {
    padding: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .markdown-editor *,
  .markdown-editor *::before,
  .markdown-editor *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
</style>
