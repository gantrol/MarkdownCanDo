<script setup lang="ts">
import abcjs from 'abcjs'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Crepe } from '@milkdown/crepe'
import '@milkdown/crepe/theme/common/style.css'
import { sanitizeSvg } from '../utils/markdown'
import { getMermaidConfig } from '../utils/mermaid'

const props = defineProps<{
  modelValue: string
  loadingLabel: string
  errorLabel: string
  toolbarLabels: string[]
  diagramLabel: string
  diagramLoadingLabel: string
  diagramErrorLabel: string
  diagramPreviewLabel: string
  editDiagramLabel: string
  hideDiagramSourceLabel: string
  musicLabel: string
  musicErrorLabel: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const host = ref<HTMLElement>()
const state = ref<'loading' | 'ready' | 'error'>('loading')

let editor: Crepe | undefined
let generation = 0
let disposed = false
let lastEmitted = ''
let diagramId = 0
let themeObserver: MutationObserver | undefined

function renderCodePreview(
  language: string,
  content: string,
  applyPreview: (value: null | string | HTMLElement) => void
) {
  const normalizedLanguage = language.trim().toLowerCase()
  if (normalizedLanguage !== 'mermaid' && normalizedLanguage !== 'abc') return null

  if (normalizedLanguage === 'abc') {
    try {
      const wrapper = document.createElement('div')
      wrapper.className = 'markdown-wysiwyg__notation'
      wrapper.setAttribute('role', 'img')
      wrapper.setAttribute('aria-label', props.musicLabel)
      abcjs.renderAbc(wrapper, content, {
        add_classes: true,
        responsive: 'resize'
      })
      wrapper.innerHTML = sanitizeSvg(wrapper.innerHTML)
      applyPreview(wrapper.outerHTML)
    } catch (error) {
      const message = document.createElement('p')
      message.className = 'markdown-wysiwyg__diagram-error'
      message.setAttribute('role', 'alert')
      message.textContent = props.musicErrorLabel
      applyPreview(message.outerHTML)
      console.warn('[MarkdownCanDo] ABC visual preview failed.', error)
    }

    return undefined
  }

  const currentId = ++diagramId
  void import('mermaid')
    .then(async ({ default: mermaid }) => {
      mermaid.initialize(getMermaidConfig())
      const { svg } = await mermaid.render(`markdown-wysiwyg-diagram-${currentId}`, content)
      if (disposed) return

      const wrapper = document.createElement('div')
      wrapper.className = 'markdown-wysiwyg__diagram'
      wrapper.setAttribute('role', 'img')
      wrapper.setAttribute('aria-label', props.diagramLabel)
      wrapper.innerHTML = sanitizeSvg(svg)
      applyPreview(wrapper.outerHTML)
    })
    .catch((error) => {
      if (disposed) return
      const message = document.createElement('p')
      message.className = 'markdown-wysiwyg__diagram-error'
      message.setAttribute('role', 'alert')
      message.textContent = props.diagramErrorLabel
      applyPreview(message.outerHTML)
      console.warn('[MarkdownCanDo] Mermaid visual preview failed.', error)
    })

  return undefined
}

async function destroyEditor() {
  const current = editor
  editor = undefined
  if (current) await current.destroy().catch(() => undefined)
}

async function createEditor(markdown: string) {
  const currentGeneration = ++generation
  state.value = 'loading'
  await destroyEditor()
  if (disposed || currentGeneration !== generation || !host.value) return

  host.value.replaceChildren()
  let ready = false
  let initialMarkdown = ''
  let waitingForInitialUpdate = true

  try {
    const instance = new Crepe({
      root: host.value,
      defaultValue: markdown,
      features: {
        [Crepe.Feature.TopBar]: true,
        [Crepe.Feature.AI]: false,
        // Object URLs created by the default uploader cannot be persisted as Markdown.
        [Crepe.Feature.ImageBlock]: false
      },
      featureConfigs: {
        [Crepe.Feature.CodeMirror]: {
          renderPreview: renderCodePreview,
          previewOnlyByDefault: true,
          previewLabel: props.diagramPreviewLabel,
          previewLoading: props.diagramLoadingLabel,
          previewToggleText: previewOnlyMode => previewOnlyMode
            ? props.editDiagramLabel
            : props.hideDiagramSourceLabel
        }
      }
    })

    instance.on((listener) => {
      listener.markdownUpdated((_context, value) => {
        if (!ready) return
        if (waitingForInitialUpdate && value === initialMarkdown) {
          waitingForInitialUpdate = false
          return
        }
        waitingForInitialUpdate = false
        if (value === props.modelValue) return
        lastEmitted = value
        emit('update:modelValue', value)
      })
    })

    editor = instance
    await instance.create()
    if (disposed || currentGeneration !== generation) {
      await instance.destroy().catch(() => undefined)
      return
    }
    initialMarkdown = instance.getMarkdown()
    host.value
      ?.querySelectorAll<HTMLButtonElement>('.milkdown-top-bar .top-bar-item')
      .forEach((button, index) => {
        const label = props.toolbarLabels[index]
        if (!label) return
        button.setAttribute('aria-label', label)
        button.title = label
      })
    ready = true
    state.value = 'ready'
  } catch (error) {
    if (currentGeneration !== generation || disposed) return
    state.value = 'error'
    console.warn('[MarkdownCanDo] WYSIWYG editor failed to initialize.', error)
  }
}

watch(() => props.modelValue, (value) => {
  if (value === lastEmitted) {
    lastEmitted = ''
    return
  }
  void createEditor(value)
})

onMounted(() => {
  void createEditor(props.modelValue)
  themeObserver = new MutationObserver(() => void createEditor(props.modelValue))
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})

onBeforeUnmount(() => {
  disposed = true
  generation++
  themeObserver?.disconnect()
  void destroyEditor()
})
</script>

<template>
  <div class="markdown-wysiwyg">
    <div ref="host" class="markdown-wysiwyg__host" />
    <div
      v-if="state === 'loading'"
      class="markdown-wysiwyg__state"
      role="status"
      aria-live="polite"
    >
      {{ loadingLabel }}
    </div>
    <div v-else-if="state === 'error'" class="markdown-wysiwyg__state markdown-wysiwyg__state--error" role="alert">
      {{ errorLabel }}
    </div>
  </div>
</template>

<style>
.markdown-wysiwyg {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: auto;
  overscroll-behavior: contain;
  background: var(--vp-c-bg);
}

.markdown-wysiwyg__host,
.markdown-wysiwyg__host > .milkdown {
  min-height: 100%;
}

.markdown-wysiwyg .milkdown {
  --crepe-color-background: var(--vp-c-bg);
  --crepe-color-on-background: var(--vp-c-text-1);
  --crepe-color-surface: var(--vp-c-bg-soft);
  --crepe-color-surface-low: var(--vp-c-bg-alt);
  --crepe-color-on-surface: var(--vp-c-text-1);
  --crepe-color-on-surface-variant: var(--vp-c-text-2);
  --crepe-color-outline: var(--vp-c-divider);
  --crepe-color-primary: var(--vp-c-brand-1);
  --crepe-color-secondary: var(--vp-c-brand-soft);
  --crepe-color-on-secondary: var(--vp-c-text-1);
  --crepe-color-inverse: var(--vp-c-text-1);
  --crepe-color-on-inverse: var(--vp-c-bg);
  --crepe-color-inline-code: var(--vp-c-danger-1);
  --crepe-color-error: var(--vp-c-danger-1);
  --crepe-color-hover: var(--vp-c-default-soft);
  --crepe-color-selected: var(--vp-c-brand-soft);
  --crepe-color-inline-area: var(--vp-c-default-soft);
  --crepe-base-font-size: 16px;
  --crepe-font-title: var(--vp-font-family-base);
  --crepe-font-default: var(--vp-font-family-base);
  --crepe-font-code: var(--vp-font-family-mono);
  --crepe-shadow-1: var(--vp-shadow-1);
  --crepe-shadow-2: var(--vp-shadow-2);
}

.markdown-wysiwyg .milkdown .ProseMirror {
  box-sizing: border-box;
  width: min(100%, 900px);
  min-height: calc(100% - 56px);
  padding: 28px 32px 64px;
  margin: 0 auto;
  color: var(--vp-c-text-1);
  caret-color: var(--vp-c-brand-1);
}

.markdown-wysiwyg .milkdown .ProseMirror:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}

.markdown-wysiwyg .milkdown .milkdown-top-bar {
  min-height: 48px;
  padding: 0 10px;
  overflow-x: auto;
  flex-wrap: nowrap;
  border-bottom-color: var(--vp-c-divider);
  background: var(--vp-c-bg);
  scrollbar-width: none;
}

.markdown-wysiwyg .milkdown .milkdown-top-bar::-webkit-scrollbar {
  display: none;
}

.markdown-wysiwyg .milkdown .milkdown-top-bar .top-bar-inner {
  min-width: max-content;
  flex-wrap: nowrap;
}

.markdown-wysiwyg .milkdown .milkdown-top-bar .top-bar-divider {
  height: 22px;
  margin: 0 6px;
  background: var(--vp-c-divider);
}

.markdown-wysiwyg .milkdown .milkdown-top-bar .top-bar-heading-selector {
  padding: 5px 4px;
}

.markdown-wysiwyg .milkdown .milkdown-top-bar .top-bar-heading-button,
.markdown-wysiwyg .milkdown .milkdown-top-bar .top-bar-item {
  border-radius: var(--ui-radius-sm);
}

.markdown-wysiwyg .milkdown .milkdown-top-bar .top-bar-item {
  width: 34px;
  height: 34px;
  margin: 4px 2px;
  padding: 6px;
}

.markdown-wysiwyg .milkdown .milkdown-top-bar .top-bar-item svg {
  width: 19px;
  height: 19px;
  color: var(--vp-c-text-2);
  fill: var(--vp-c-text-2);
}

.markdown-wysiwyg .milkdown .milkdown-top-bar .top-bar-item:hover svg,
.markdown-wysiwyg .milkdown .milkdown-top-bar .top-bar-item.active svg {
  color: var(--vp-c-brand-1);
  fill: var(--vp-c-brand-1);
}

.markdown-wysiwyg .markdown-wysiwyg__diagram,
.markdown-wysiwyg .markdown-wysiwyg__notation {
  display: grid;
  min-height: 150px;
  padding: 18px;
  place-items: center;
  overflow: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--ui-radius-md);
  background: var(--vp-c-bg-soft);
}

@supports (corner-shape: superellipse(2)) {
  .markdown-wysiwyg .milkdown .milkdown-top-bar .top-bar-heading-button,
  .markdown-wysiwyg .milkdown .milkdown-top-bar .top-bar-item,
  .markdown-wysiwyg .markdown-wysiwyg__diagram,
  .markdown-wysiwyg .markdown-wysiwyg__notation {
    corner-shape: var(--ui-corner-curve);
  }
}

.markdown-wysiwyg .markdown-wysiwyg__diagram svg,
.markdown-wysiwyg .markdown-wysiwyg__notation svg {
  display: block;
  max-width: 100%;
  height: auto;
}

.dark .markdown-wysiwyg .markdown-wysiwyg__notation svg {
  filter: invert(0.88);
}

.markdown-wysiwyg .markdown-wysiwyg__diagram-error {
  display: grid;
  min-height: 120px;
  padding: 20px;
  place-items: center;
  color: var(--vp-c-danger-1);
  text-align: center;
}

.markdown-wysiwyg__state {
  position: absolute;
  inset: 0;
  display: grid;
  padding: 24px;
  place-items: center;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
}

.markdown-wysiwyg__state--error {
  color: var(--vp-c-danger-1);
}

@media (max-width: 767px) {
  .markdown-wysiwyg .milkdown .ProseMirror {
    padding: 20px 16px 48px;
  }
}
</style>
