<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { resolveUiLocaleTag, tutorialMessages } from '../utils/i18n'
import MarkdownEditor from './MarkdownEditor.vue'
import VTIconChevronLeft from './icons/VTIconChevronLeft.vue'
import VTIconChevronRight from './icons/VTIconChevronRight.vue'
import VTLink from './VTLink.vue'
import VTFlyout from './VTFlyout.vue'

type TutorialData = Record<string, {
  'description.md'?: string
  App?: { 'template.md'?: string }
  _hint?: {
    'description.md'?: string
    App?: { 'template.md'?: string }
  }
}>

type MobilePanel = 'instructions' | 'editor'

const props = withDefaults(defineProps<{
  data: TutorialData
  hintText: string
  resetText: string
  previousButtonText: string
  nextButtonText: string
  EMPTY_CODE_PLACEHOLDER?: string
  noDescriptionAvailable?: string
}>(), {
  data: () => ({})
})

const { lang } = useData()
const locale = computed(() => resolveUiLocaleTag(lang.value))
const messages = computed(() => tutorialMessages[locale.value])
const tutorial = ref<HTMLElement>()
const instruction = ref<HTMLElement>()
const splitter = ref<HTMLElement>()
const instructionsTab = ref<HTMLButtonElement>()
const editorTab = ref<HTMLButtonElement>()
const showingHint = ref(false)
const isResizing = ref(false)
const mobilePanel = ref<MobilePanel>('instructions')
const splitPercent = ref(42)
const splitMinimum = ref(20)
const splitMaximum = ref(72)
const keys = Object.keys(props.data).sort((a, b) => stepNumber(a) - stepNumber(b))
const currentStep = ref(keys[0] ?? 'step-1')

const minimumInstructionWidth = 300
const minimumEditorWidth = 440
const splitterWidth = 12
let layoutObserver: ResizeObserver | undefined

const currentDescription = computed(() => {
  const step = props.data[currentStep.value]
  if (showingHint.value && step?._hint?.['description.md']) {
    return step._hint['description.md']
  }
  return step?.['description.md'] ?? props.noDescriptionAvailable ?? messages.value.noDescription
})

const currentCode = computed(() => {
  const step = props.data[currentStep.value]
  if (showingHint.value && step?._hint?.App?.['template.md']) {
    return step._hint.App['template.md']
  }
  return step?.App?.['template.md'] ?? props.EMPTY_CODE_PLACEHOLDER ?? messages.value.emptyCode
})

const currentStepIndex = computed(() => Math.max(1, keys.indexOf(currentStep.value) + 1))
const previousStep = computed(() => keys[currentStepIndex.value - 2])
const nextStep = computed(() => keys[currentStepIndex.value])
const showHintText = computed(() => showingHint.value ? props.resetText : props.hintText)
const stepsLabel = computed(() => messages.value.steps)
const instructionsLabel = computed(() => messages.value.instructions)
const tutorialStyle = computed(() => ({
  '--tutorial-instruction-width': `${splitPercent.value}%`
}))
const splitValue = computed(() => Math.round(splitPercent.value))
const splitStorageKey = computed(() => `markdowncando:tutorial-width:${locale.value}`)

const allSteps = keys.map((key, index) => ({
  key,
  text: `${index + 1}. ${extractHeading(props.data[key]?.['description.md'], key)}`,
  link: `#${key}`
}))

const editorOptions = {
  preview: { delay: 160 }
}

function stepNumber(value: string) {
  return Number(value.match(/\d+/u)?.[0] ?? Number.MAX_SAFE_INTEGER)
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value))
}

function updateSplitBounds() {
  const width = tutorial.value?.getBoundingClientRect().width ?? 0
  if (!width) return

  splitMinimum.value = Math.min(45, minimumInstructionWidth / width * 100)
  splitMaximum.value = Math.max(
    splitMinimum.value,
    Math.min(72, (width - minimumEditorWidth - splitterWidth) / width * 100)
  )
  splitPercent.value = clamp(splitPercent.value, splitMinimum.value, splitMaximum.value)
}

function resizeFromPointer(clientX: number) {
  const bounds = tutorial.value?.getBoundingClientRect()
  if (!bounds?.width) return
  const requested = (clientX - bounds.left) / bounds.width * 100
  splitPercent.value = clamp(requested, splitMinimum.value, splitMaximum.value)
}

function persistSplitWidth() {
  try {
    localStorage.setItem(splitStorageKey.value, splitPercent.value.toFixed(1))
  } catch {
    // Resizing remains available when browser storage is unavailable.
  }
}

function startResize(event: PointerEvent) {
  if (event.pointerType === 'mouse' && event.button !== 0) return
  event.preventDefault()
  isResizing.value = true
  splitter.value?.setPointerCapture(event.pointerId)
  resizeFromPointer(event.clientX)
}

function continueResize(event: PointerEvent) {
  if (!isResizing.value) return
  resizeFromPointer(event.clientX)
}

function finishResize(event: PointerEvent) {
  if (!isResizing.value) return
  isResizing.value = false
  if (splitter.value?.hasPointerCapture(event.pointerId)) {
    splitter.value.releasePointerCapture(event.pointerId)
  }
  persistSplitWidth()
}

function handleSplitterKeydown(event: KeyboardEvent) {
  let next = splitPercent.value
  if (event.key === 'ArrowLeft') next -= 2
  else if (event.key === 'ArrowRight') next += 2
  else if (event.key === 'Home') next = splitMinimum.value
  else if (event.key === 'End') next = splitMaximum.value
  else return

  event.preventDefault()
  splitPercent.value = clamp(next, splitMinimum.value, splitMaximum.value)
  persistSplitWidth()
}

function selectMobilePanel(panel: MobilePanel, focusTab = false) {
  mobilePanel.value = panel
  void nextTick(() => {
    if (focusTab) {
      (panel === 'instructions' ? instructionsTab.value : editorTab.value)?.focus()
    }
    if (window.matchMedia('(max-width: 900px)').matches) {
      tutorial.value?.scrollIntoView({ block: 'start', behavior: 'auto' })
    }
  })
}

function handleMobileTabKeydown(event: KeyboardEvent) {
  let next: MobilePanel | undefined
  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'Home') {
    next = 'instructions'
  } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === 'End') {
    next = 'editor'
  }
  if (!next) return
  event.preventDefault()
  selectMobilePanel(next, true)
}

function extractHeading(html = '', fallback: string) {
  const heading = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/iu)?.[1] ?? fallback
  return heading
    .replace(/<a[^>]*class="header-anchor"[^>]*>[\s\S]*?<\/a>/giu, '')
    .replace(/<[^>]+>/gu, '')
    .replace(/&amp;/gu, '&')
    .replace(/&lt;/gu, '<')
    .replace(/&gt;/gu, '>')
    .trim()
}

function updateStep(scroll = false) {
  const requested = location.hash.slice(1)
  const next = Object.prototype.hasOwnProperty.call(props.data, requested)
    ? requested
    : keys[0]

  if (!next) return
  if (requested !== next) {
    history.replaceState(null, '', `${location.pathname}${location.search}#${next}`)
  }

  currentStep.value = next
  if (scroll) {
    void nextTick(() => instruction.value?.scrollTo({ top: 0, behavior: 'auto' }))
  }
}

function handleHashChange() {
  showingHint.value = false
  updateStep(true)
}

function toggleResult() {
  showingHint.value = !showingHint.value
}

onMounted(() => {
  updateStep()
  try {
    const storedWidth = localStorage.getItem(splitStorageKey.value)
    const savedWidth = storedWidth === null ? Number.NaN : Number(storedWidth)
    if (Number.isFinite(savedWidth)) splitPercent.value = savedWidth
  } catch {
    // Use the default width when browser storage is unavailable.
  }
  updateSplitBounds()
  if ('ResizeObserver' in window && tutorial.value) {
    layoutObserver = new ResizeObserver(updateSplitBounds)
    layoutObserver.observe(tutorial.value)
  }
  window.addEventListener('hashchange', handleHashChange)
})

onBeforeUnmount(() => {
  layoutObserver?.disconnect()
  window.removeEventListener('hashchange', handleHashChange)
})
</script>

<template>
  <main
    ref="tutorial"
    class="tutorial"
    :class="{ 'is-resizing': isResizing }"
    :style="tutorialStyle"
  >
    <div class="tutorial__mobile-tabs" role="tablist" :aria-label="messages.mobilePanels">
      <button
        id="tutorial-instructions-tab"
        ref="instructionsTab"
        type="button"
        role="tab"
        :class="{ 'is-active': mobilePanel === 'instructions' }"
        :aria-selected="mobilePanel === 'instructions'"
        aria-controls="tutorial-instructions-panel"
        :tabindex="mobilePanel === 'instructions' ? 0 : -1"
        @click="selectMobilePanel('instructions')"
        @keydown="handleMobileTabKeydown"
      >
        {{ messages.instructions }}
      </button>
      <button
        id="tutorial-editor-tab"
        ref="editorTab"
        type="button"
        role="tab"
        :class="{ 'is-active': mobilePanel === 'editor' }"
        :aria-selected="mobilePanel === 'editor'"
        aria-controls="tutorial-editor-panel"
        :tabindex="mobilePanel === 'editor' ? 0 : -1"
        @click="selectMobilePanel('editor')"
        @keydown="handleMobileTabKeydown"
      >
        {{ messages.editorPanel }}
      </button>
    </div>

    <article
      id="tutorial-instructions-panel"
      ref="instruction"
      class="instruction"
      :class="{ 'tutorial__panel--mobile-hidden': mobilePanel !== 'instructions' }"
      :aria-label="instructionsLabel"
    >
      <VTFlyout
        class="tutorial__steps"
        :button="`${currentStepIndex} / ${keys.length}`"
        :label="stepsLabel"
      >
        <ol class="tutorial__step-list">
          <li v-for="step in allSteps" :key="step.key">
            <VTLink
              class="vt-menu-link"
              :class="{ active: step.key === currentStep }"
              :aria-current="step.key === currentStep ? 'step' : undefined"
              :href="step.link"
            >
              {{ step.text }}
            </VTLink>
          </li>
        </ol>
      </VTFlyout>

      <div
        id="tutorial-description"
        class="vt-doc"
        v-html="currentDescription"
      />

      <div v-if="props.data[currentStep]?._hint" class="hint">
        <button
          id="show-result"
          type="button"
          :aria-pressed="showingHint"
          aria-controls="tutorial-description markdown-tutorial-editor"
          @click="toggleResult"
        >
          {{ showHintText }}
        </button>
      </div>

      <footer class="tutorial__footer">
        <a v-if="previousStep" :href="`#${previousStep}`">
          <VTIconChevronLeft class="vt-link-icon" />
          {{ props.previousButtonText }}
        </a>
        <a v-if="nextStep" class="next-step" :href="`#${nextStep}`">
          {{ props.nextButtonText }}
          <VTIconChevronRight class="vt-link-icon" />
        </a>
      </footer>
    </article>

    <div
      ref="splitter"
      class="tutorial__splitter"
      role="separator"
      tabindex="0"
      aria-orientation="vertical"
      aria-controls="tutorial-description markdown-tutorial-editor"
      :aria-label="messages.resizeInstructions"
      :aria-valuemin="Math.round(splitMinimum)"
      :aria-valuemax="Math.round(splitMaximum)"
      :aria-valuenow="splitValue"
      @keydown="handleSplitterKeydown"
      @pointerdown="startResize"
      @pointermove="continueResize"
      @pointerup="finishResize"
      @pointercancel="finishResize"
    />

    <section
      id="tutorial-editor-panel"
      class="tutorial__editor-panel"
      :class="{ 'tutorial__panel--mobile-hidden': mobilePanel !== 'editor' }"
      :aria-label="messages.editorPanel"
    >
      <MarkdownEditor
        id="markdown-tutorial-editor"
        :text="currentCode"
        :options="editorOptions"
      />
    </section>
  </main>
</template>

<style scoped>
.tutorial {
  display: grid;
  width: 100%;
  max-width: 1600px;
  height: calc(100dvh - var(--vp-nav-height, 64px));
  min-height: 560px;
  margin: 0 auto;
  grid-template-columns: minmax(300px, var(--tutorial-instruction-width, 42%)) 12px minmax(0, 1fr);
}

.instruction {
  position: relative;
  min-width: 0;
  min-height: 0;
  padding: 0 32px 28px;
  overflow-y: auto;
  font-size: 15px;
  overscroll-behavior: contain;
}

.tutorial__editor-panel {
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.tutorial__mobile-tabs {
  display: none;
}

.tutorial__splitter {
  position: relative;
  z-index: 8;
  display: grid;
  min-width: 12px;
  place-items: center;
  border-right: 1px solid var(--vp-c-divider);
  border-left: 1px solid var(--vp-c-divider);
  outline: 0;
  background: var(--vp-c-bg-soft);
  cursor: col-resize;
  touch-action: none;
}

.tutorial__splitter::after {
  width: 3px;
  height: 48px;
  border-radius: 999px;
  background: var(--vp-c-border);
  content: '';
  transition: height 140ms ease, background-color 140ms ease;
}

.tutorial__splitter:hover::after,
.tutorial__splitter:focus-visible::after,
.tutorial.is-resizing .tutorial__splitter::after {
  height: 64px;
  background: var(--vp-c-text-3);
}

.tutorial__splitter:focus-visible {
  box-shadow: inset 0 0 0 2px var(--vp-c-brand-1);
}

.tutorial.is-resizing,
.tutorial.is-resizing * {
  cursor: col-resize !important;
  user-select: none !important;
}

.tutorial__steps {
  position: sticky;
  z-index: 9;
  top: 0;
  float: right;
  margin-right: -12px;
  background: color-mix(in srgb, var(--vp-c-bg) 92%, transparent);
  backdrop-filter: blur(8px);
}

.vt-menu-link.active {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.tutorial__step-list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.tutorial__footer {
  display: flex;
  padding-top: 16px;
  margin-top: 24px;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--vp-c-divider);
}

.tutorial__footer a {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.tutorial__footer .vt-link-icon {
  margin: 0 4px;
}

.next-step {
  margin-left: auto;
}

.vt-doc :deep(h1) {
  margin: 1em 0;
  font-size: 1.4em;
}

.vt-doc :deep(h2) {
  padding: 0;
  margin: 1.2em 0 0.5em;
  border-top: 0;
  font-size: 1.1em;
}

.vt-doc :deep(.header-anchor) {
  display: none;
}

.vt-doc :deep(summary) {
  cursor: pointer;
}

.hint {
  padding-top: 16px;
}

#show-result {
  min-height: 44px;
  padding: 8px 16px;
  border-radius: 9px;
  color: var(--vp-button-brand-text);
  background: var(--vp-c-brand-3);
  font-size: 14px;
  font-weight: 700;
}

#show-result:hover {
  background: var(--vp-c-brand-2);
}

@supports (corner-shape: superellipse(2)) {
  #show-result,
  .tutorial__mobile-tabs button {
    corner-shape: var(--ui-corner-curve);
  }
}

.tutorial :deep(.markdown-editor) {
  --md-editor-height: 100%;
  min-height: 0;
  border-width: 0;
  border-radius: 0;
  box-shadow: none;
}

@media (max-width: 900px) {
  .tutorial {
    display: block;
    height: auto;
    min-height: 0;
  }

  .tutorial__mobile-tabs {
    position: sticky;
    z-index: 20;
    top: var(--vp-nav-height, 64px);
    display: flex;
    padding: 7px;
    gap: 4px;
    border-bottom: 1px solid var(--vp-c-divider);
    background: color-mix(in srgb, var(--vp-c-bg) 94%, transparent);
    backdrop-filter: saturate(130%) blur(12px);
  }

  .tutorial__mobile-tabs button {
    min-width: 0;
    min-height: 42px;
    padding: 0 14px;
    flex: 1;
    border: 0;
    border-radius: var(--ui-radius-sm);
    color: var(--vp-c-text-2);
    background: transparent;
    font-size: 14px;
    font-weight: 650;
    cursor: pointer;
  }

  .tutorial__mobile-tabs button:hover {
    color: var(--vp-c-text-1);
    background: var(--vp-c-bg-mute);
  }

  .tutorial__mobile-tabs button.is-active {
    color: var(--vp-c-brand-1);
    background: var(--vp-c-bg);
    box-shadow: 0 1px 4px rgb(0 0 0 / 10%);
  }

  .tutorial__mobile-tabs button:focus-visible {
    outline: 2px solid var(--vp-c-brand-1);
    outline-offset: -2px;
  }

  .tutorial__panel--mobile-hidden {
    display: none !important;
  }

  .instruction {
    height: auto;
    padding: 0 20px 24px;
    overflow: visible;
    border-right: 0;
    border-bottom: 1px solid var(--vp-c-divider);
  }

  .tutorial__splitter {
    display: none;
  }

  .tutorial__editor-panel {
    height: calc(100dvh - var(--vp-nav-height, 64px) - 57px);
    min-height: 480px;
  }

  .tutorial :deep(.markdown-editor) {
    --md-editor-height: 100%;
    height: 100%;
    min-height: 0;
    border-bottom: 1px solid var(--vp-c-divider);
  }
}
</style>
