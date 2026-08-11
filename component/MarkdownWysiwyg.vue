<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Crepe } from '@milkdown/crepe'
import '@milkdown/crepe/theme/common/style.css'

const props = defineProps<{
  modelValue: string
  loadingLabel: string
  errorLabel: string
  toolbarLabels: string[]
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

onMounted(() => void createEditor(props.modelValue))

onBeforeUnmount(() => {
  disposed = true
  generation++
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
