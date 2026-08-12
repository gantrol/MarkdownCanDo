<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { diagramMessages, type UiLocale } from '../../../../utils/i18n'
import { renderMarkdown, sanitizeSvg } from '../../../../utils/markdown'
import { getMermaidConfig } from '../../../../utils/mermaid'

const props = defineProps<{
  source: string
  locale: UiLocale
  label: string
}>()

const root = ref<HTMLElement>()
const previewHtml = ref('')
const labels = computed(() => diagramMessages[props.locale])

let renderTimer: ReturnType<typeof setTimeout> | undefined
let themeObserver: MutationObserver | undefined
let renderVersion = 0
let diagramId = 0

function scheduleRender(immediate = false) {
  if (typeof window === 'undefined') return
  if (renderTimer) clearTimeout(renderTimer)
  renderTimer = setTimeout(() => void renderPreview(), immediate ? 0 : 160)
}

async function renderPreview() {
  const version = ++renderVersion
  previewHtml.value = renderMarkdown(props.source, props.locale)
  await nextTick()
  if (version !== renderVersion || !root.value) return

  const diagrams = root.value.querySelectorAll<HTMLElement>('[data-enhancement="mermaid"]')
  if (!diagrams.length) return

  const { default: mermaid } = await import('mermaid')
  mermaid.initialize(getMermaidConfig())

  for (const element of diagrams) {
    if (version !== renderVersion) return
    const canvas = element.querySelector<HTMLElement>('.md-preview-diagram__canvas')
    const status = element.querySelector<HTMLElement>('.md-preview-diagram__status')
    const code = element.querySelector('code')?.textContent ?? ''
    if (!canvas || !code) continue

    element.dataset.state = 'loading'
    canvas.setAttribute('aria-label', labels.value.mermaid)
    if (status) {
      status.removeAttribute('hidden')
      status.textContent = labels.value.mermaidLoading
    }

    try {
      const { svg } = await mermaid.render(`home-markdown-diagram-${++diagramId}`, code)
      if (version !== renderVersion) return
      canvas.innerHTML = sanitizeSvg(svg)
      element.dataset.state = 'ready'
      status?.setAttribute('hidden', '')
    } catch (error) {
      canvas.replaceChildren()
      element.dataset.state = 'error'
      if (status) status.textContent = labels.value.mermaidError
      console.warn('[MarkdownCanDo] Home Mermaid preview failed.', error)
    }
  }
}

watch(() => [props.source, props.locale], () => scheduleRender())

onMounted(() => {
  scheduleRender(true)
  themeObserver = new MutationObserver(() => scheduleRender(true))
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})

onBeforeUnmount(() => {
  renderVersion++
  if (renderTimer) clearTimeout(renderTimer)
  themeObserver?.disconnect()
})
</script>

<template>
  <section class="home-product-visual__preview">
    <div class="home-product-visual__pane-label">{{ label }}</div>
    <div ref="root" class="home-product-visual__preview-content" v-html="previewHtml" />
  </section>
</template>
