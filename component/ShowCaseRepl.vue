<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import MarkdownEditor from './MarkdownEditor.vue'
import { getUiLocale, showcaseMessages, type UiLocale } from '../utils/i18n'

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
const locale = ref<UiLocale>('en-US')

const currentCode = computed(() => props.data[currentHash.value]?.App?.['template.md'] ?? '')
const messages = computed(() => showcaseMessages[locale.value])

const editorOptions = {
  mode: 'split' as const,
  preview: { delay: 160 }
}

function titleForKey(key: string) {
  const localized = messages.value.examples[key as keyof typeof messages.value.examples]
  if (localized) return localized

  return key
    .replace(/^mermaid-/u, '')
    .split(/[-_]/u)
    .map(word => word.toLowerCase() === 'chatgpt'
      ? 'ChatGPT'
      : word.charAt(0).toUpperCase() + word.slice(1))
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
      <div class="showcase__intro">
        <h1 aria-live="polite">{{ titleForKey(currentHash) }}</h1>
      </div>
      <nav class="showcase__nav" :aria-label="messages.heading">
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
  max-width: 1440px;
  padding: 26px 30px 40px;
  margin: 0 auto;
}

.showcase__header {
  margin-bottom: 20px;
}

.showcase__intro {
  margin-bottom: 16px;
}

.showcase__header h1 {
  margin: 0;
  font-size: clamp(25px, 3vw, 34px);
  line-height: 1.15;
  letter-spacing: -0.04em;
}

.showcase__nav {
  display: flex;
  width: 100%;
  padding: 4px;
  overflow-x: auto;
  gap: 3px;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--ui-radius-md);
  background: var(--vp-c-bg-mute);
  scrollbar-width: none;
}

.showcase__nav::-webkit-scrollbar {
  display: none;
}

.showcase__nav a {
  display: inline-flex;
  min-height: 36px;
  padding: 7px 11px;
  align-items: center;
  border: 0;
  border-radius: var(--ui-radius-sm);
  color: var(--vp-c-text-2);
  white-space: nowrap;
  font-size: 12px;
  font-weight: 650;
}

@supports (corner-shape: superellipse(2)) {
  .showcase__nav,
  .showcase__nav a {
    corner-shape: var(--ui-corner-curve);
  }
}

.showcase__nav a:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.showcase__nav a[aria-current='page'] {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
  box-shadow: 0 1px 3px rgb(0 0 0 / 10%);
}

.showcase :deep(.markdown-editor) {
  --md-editor-height: calc(100dvh - var(--vp-nav-height, 64px) - 206px);
  min-height: 520px;
}

@media (max-width: 800px) {
  .showcase {
    padding: 18px 12px 28px;
  }

  .showcase__header {
    margin-bottom: 16px;
  }

  .showcase__intro {
    display: block;
    margin-bottom: 12px;
  }

  .showcase__nav a {
    min-height: 40px;
  }

  .showcase :deep(.markdown-editor) {
    --md-editor-height: 70dvh;
    min-height: 500px;
  }
}
</style>
