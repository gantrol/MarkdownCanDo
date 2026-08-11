<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import { diagramMessages, resolveUiLocaleTag } from '../../../utils/i18n'
import { sanitizeSvg } from '../../../utils/markdown'

const props = defineProps<{
  code: string
}>()

const { lang } = useData()
const labels = computed(() => diagramMessages[resolveUiLocaleTag(lang.value)])
const root = ref<HTMLElement>()
const canvas = ref<HTMLElement>()
const source = ref('')
const status = ref<'idle' | 'loading' | 'ready' | 'error'>('idle')

let intersectionObserver: IntersectionObserver | undefined
let renderVersion = 0

function decodeBase64(value: string) {
  const bytes = Uint8Array.from(atob(value), character => character.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

async function renderNotation() {
  if (!canvas.value || !source.value) return
  const currentVersion = ++renderVersion
  status.value = 'loading'

  try {
    const { default: abcjs } = await import('abcjs')
    if (currentVersion !== renderVersion || !canvas.value) return
    abcjs.renderAbc(canvas.value, source.value, {
      add_classes: true,
      responsive: 'resize'
    })
    canvas.value.innerHTML = sanitizeSvg(canvas.value.innerHTML)
    status.value = 'ready'
  } catch (error) {
    if (currentVersion !== renderVersion || !canvas.value) return
    canvas.value.replaceChildren()
    status.value = 'error'
    console.warn('[MarkdownCanDo] ABC rendering failed.', error)
  }
}

onMounted(async () => {
  source.value = decodeBase64(props.code)
  await nextTick()

  if ('IntersectionObserver' in window && root.value) {
    intersectionObserver = new IntersectionObserver((entries) => {
      if (!entries.some(entry => entry.isIntersecting)) return
      intersectionObserver?.disconnect()
      void renderNotation()
    }, { rootMargin: '240px 0px' })
    intersectionObserver.observe(root.value)
  } else {
    void renderNotation()
  }
})

onBeforeUnmount(() => {
  renderVersion++
  intersectionObserver?.disconnect()
})
</script>

<template>
  <figure ref="root" class="abc-notation" :aria-busy="status === 'loading'">
    <div
      ref="canvas"
      class="abc-notation__canvas"
      role="img"
      :aria-label="labels.music"
    />
    <p v-if="status === 'idle' || status === 'loading'" class="abc-notation__status" role="status">
      {{ labels.musicLoading }}
    </p>
    <p v-else-if="status === 'error'" class="abc-notation__error" role="alert">
      {{ labels.musicError }}
    </p>
    <details v-if="source" class="abc-notation__source">
      <summary>{{ labels.musicSource }}</summary>
      <pre><code>{{ source }}</code></pre>
    </details>
  </figure>
</template>

<style scoped>
.abc-notation {
  position: relative;
  min-height: 180px;
  margin: 24px 0;
  padding: 18px;
  overflow: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--ui-radius-card);
  background: var(--vp-c-bg-soft);
}

.abc-notation__canvas :deep(svg) {
  display: block;
  max-width: 100%;
  height: auto;
  margin: auto;
}

.dark .abc-notation__canvas :deep(svg) {
  filter: invert(0.88);
}

.abc-notation__status,
.abc-notation__error {
  display: grid;
  min-height: 144px;
  margin: 0;
  place-items: center;
  color: var(--vp-c-text-2);
}

.abc-notation__error {
  color: var(--vp-c-danger-1);
}

.abc-notation__source {
  margin-top: 12px;
  font-size: 13px;
}

.abc-notation__source summary {
  cursor: pointer;
  color: var(--vp-c-text-2);
}

.abc-notation__source pre {
  margin: 12px 0 0;
}
</style>
