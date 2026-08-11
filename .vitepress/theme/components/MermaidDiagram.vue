<script setup lang="ts">
import DOMPurify from 'dompurify'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId } from 'vue'

const props = defineProps<{
  code: string
}>()

const canvas = ref<HTMLElement>()
const root = ref<HTMLElement>()
const source = ref('')
const status = ref<'idle' | 'loading' | 'ready' | 'error'>('idle')
const isVisible = ref(false)
const componentId = useId().replace(/[^a-z0-9_-]/giu, '-')

let intersectionObserver: IntersectionObserver | undefined
let themeObserver: MutationObserver | undefined
let renderVersion = 0

const message = computed(() => {
  const lang = typeof document === 'undefined' ? 'en' : document.documentElement.lang
  if (lang.startsWith('zh')) return '图表暂时无法渲染，请检查下方源码。'
  if (lang.startsWith('pt')) return 'Não foi possível renderizar o diagrama. Verifique o código-fonte abaixo.'
  return 'The diagram could not be rendered. Check the source below.'
})

function decodeBase64(value: string) {
  const bytes = Uint8Array.from(atob(value), character => character.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

async function renderDiagram() {
  if (!canvas.value || !source.value || !isVisible.value) return

  const currentVersion = ++renderVersion
  status.value = 'loading'

  try {
    const { default: mermaid } = await import('mermaid')
    if (currentVersion !== renderVersion || !canvas.value) return

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      suppressErrorRendering: true,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default'
    })

    const id = `markdowncando-diagram-${componentId}-${currentVersion}`
    const { svg, bindFunctions } = await mermaid.render(id, source.value)
    if (currentVersion !== renderVersion || !canvas.value) return

    canvas.value.innerHTML = DOMPurify.sanitize(svg, {
      USE_PROFILES: { html: true, svg: true, svgFilters: true }
    })
    bindFunctions?.(canvas.value)
    status.value = 'ready'
  } catch (error) {
    if (currentVersion !== renderVersion || !canvas.value) return
    canvas.value.replaceChildren()
    status.value = 'error'
    console.warn('[MarkdownCanDo] Mermaid rendering failed.', error)
  }
}

onMounted(async () => {
  source.value = decodeBase64(props.code)
  await nextTick()

  if ('IntersectionObserver' in window && root.value) {
    intersectionObserver = new IntersectionObserver((entries) => {
      if (!entries.some(entry => entry.isIntersecting)) return
      isVisible.value = true
      intersectionObserver?.disconnect()
      void renderDiagram()
    }, { rootMargin: '240px 0px' })
    intersectionObserver.observe(root.value)
  } else {
    isVisible.value = true
    void renderDiagram()
  }

  themeObserver = new MutationObserver(() => {
    if (status.value === 'ready') void renderDiagram()
  })
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})

onBeforeUnmount(() => {
  renderVersion++
  intersectionObserver?.disconnect()
  themeObserver?.disconnect()
})
</script>

<template>
  <figure ref="root" class="mermaid-diagram" :aria-busy="status === 'loading'">
    <div
      ref="canvas"
      class="mermaid-diagram__canvas"
      role="img"
      aria-label="Mermaid diagram"
    />
    <p v-if="status === 'idle' || status === 'loading'" class="mermaid-diagram__status" role="status">
      Rendering diagram…
    </p>
    <p v-else-if="status === 'error'" class="mermaid-diagram__error" role="alert">
      {{ message }}
    </p>
    <details v-if="source" class="mermaid-diagram__source">
      <summary>Mermaid source</summary>
      <pre><code>{{ source }}</code></pre>
    </details>
  </figure>
</template>

<style scoped>
.mermaid-diagram {
  position: relative;
  min-height: 160px;
  margin: 24px 0;
  padding: 16px;
  overflow: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.mermaid-diagram__canvas :deep(svg) {
  display: block;
  max-width: 100%;
  height: auto;
  margin: auto;
}

.mermaid-diagram__status,
.mermaid-diagram__error {
  display: grid;
  min-height: 126px;
  margin: 0;
  place-items: center;
  color: var(--vp-c-text-2);
}

.mermaid-diagram__error {
  color: var(--vp-c-danger-1);
}

.mermaid-diagram__source {
  margin-top: 12px;
  font-size: 13px;
}

.mermaid-diagram__source summary {
  cursor: pointer;
  color: var(--vp-c-text-2);
}

.mermaid-diagram__source pre {
  margin: 12px 0 0;
}

@media (prefers-reduced-motion: reduce) {
  .mermaid-diagram * {
    scroll-behavior: auto !important;
  }
}
</style>
