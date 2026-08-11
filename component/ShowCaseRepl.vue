<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import MarkdownEditor from './MarkdownEditor.vue'
import { getUiLocale } from '../utils/i18n'

type ShowcaseData = Record<string, {
  App?: { 'template.md'?: string }
}>

const props = withDefaults(defineProps<{
  data: ShowcaseData
}>(), {
  data: () => ({})
})

const keys = Object.keys(props.data)
const currentHash = ref(keys[0] ?? '')
const locale = ref<'en' | 'pt' | 'zh'>('en')

const currentCode = computed(() => props.data[currentHash.value]?.App?.['template.md'] ?? '')
const heading = computed(() => {
  if (locale.value === 'zh') return 'Markdown 示例'
  if (locale.value === 'pt') return 'Exemplos de Markdown'
  return 'Markdown examples'
})

const editorOptions = {
  mode: 'split' as const,
  preview: { delay: 160 }
}

function titleForKey(key: string) {
  return key
    .replace(/^mermaid-/u, '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function updateExample() {
  const requested = location.hash.slice(1)
  const next = Object.prototype.hasOwnProperty.call(props.data, requested)
    ? requested
    : keys[0]

  if (!next) return
  currentHash.value = next
  if (requested !== next) {
    history.replaceState(null, '', `${location.pathname}${location.search}#${next}`)
  }
}

onMounted(() => {
  locale.value = getUiLocale()
  updateExample()
  window.addEventListener('hashchange', updateExample)
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', updateExample)
})
</script>

<template>
  <main class="showcase">
    <header class="showcase__header">
      <div>
        <h1>{{ heading }}</h1>
        <p aria-live="polite">{{ titleForKey(currentHash) }}</p>
      </div>
      <nav class="showcase__nav" :aria-label="heading">
        <a
          v-for="key in keys"
          :key="key"
          :href="`#${key}`"
          :aria-current="key === currentHash ? 'page' : undefined"
        >
          {{ titleForKey(key) }}
        </a>
      </nav>
    </header>

    <MarkdownEditor
      id="markdown-showcase-editor"
      :text="currentCode"
      :options="editorOptions"
    />
  </main>
</template>

<style scoped>
.showcase {
  width: 100%;
  max-width: 1500px;
  padding: 24px 28px 36px;
  margin: 0 auto;
}

.showcase__header {
  display: flex;
  margin-bottom: 18px;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
}

.showcase__header h1 {
  margin: 0;
  font-size: clamp(24px, 3vw, 36px);
  line-height: 1.2;
}

.showcase__header p {
  margin: 6px 0 0;
  color: var(--vp-c-text-2);
}

.showcase__nav {
  display: flex;
  max-width: min(760px, 65vw);
  padding-bottom: 4px;
  overflow-x: auto;
  gap: 6px;
  scrollbar-width: thin;
}

.showcase__nav a {
  display: inline-flex;
  min-height: 40px;
  padding: 8px 12px;
  align-items: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  font-size: 13px;
  font-weight: 600;
}

.showcase__nav a:hover,
.showcase__nav a[aria-current='page'] {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.showcase :deep(.markdown-editor) {
  --md-editor-height: calc(100dvh - var(--vp-nav-height, 64px) - 150px);
  min-height: 560px;
}

@media (max-width: 800px) {
  .showcase {
    padding: 18px 12px 28px;
  }

  .showcase__header {
    display: block;
  }

  .showcase__nav {
    max-width: 100%;
    margin-top: 14px;
  }

  .showcase__nav a {
    min-height: 44px;
  }

  .showcase :deep(.markdown-editor) {
    --md-editor-height: 70dvh;
    min-height: 500px;
  }
}
</style>
