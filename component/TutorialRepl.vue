<script setup lang="ts">
import { Maximize2, Minimize2 } from '@lucide/vue'
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

type TutorialView = 'split' | 'instructions' | 'editor'

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
const instruction = ref<HTMLElement>()
const showingHint = ref(false)
const tutorialView = ref<TutorialView>('split')
const keys = Object.keys(props.data).sort((a, b) => stepNumber(a) - stepNumber(b))
const currentStep = ref(keys[0] ?? 'step-1')

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
const instructionViewLabel = computed(() => tutorialView.value === 'instructions'
  ? messages.value.restoreSplitView
  : messages.value.windowInstructions)

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

function togglePanelView(panel: Exclude<TutorialView, 'split'>) {
  tutorialView.value = tutorialView.value === panel ? 'split' : panel
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
  window.addEventListener('hashchange', handleHashChange)
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', handleHashChange)
})
</script>

<template>
  <main class="tutorial" :class="`tutorial--${tutorialView}`">
    <article
      id="tutorial-instructions-panel"
      ref="instruction"
      class="instruction"
      :aria-label="instructionsLabel"
    >
      <div class="tutorial__instruction-actions">
        <button
          type="button"
          class="markdown-editor__tool tutorial__panel-toggle"
          :aria-label="instructionViewLabel"
          :title="instructionViewLabel"
          aria-controls="tutorial-instructions-panel"
          @click="togglePanelView('instructions')"
        >
          <Minimize2 v-if="tutorialView === 'instructions'" :size="17" :stroke-width="1.8" aria-hidden="true" />
          <Maximize2 v-else :size="17" :stroke-width="1.8" aria-hidden="true" />
        </button>

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
      </div>

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

    <section
      id="tutorial-editor-panel"
      class="tutorial__editor-panel"
      :aria-label="messages.editorPanel"
    >
      <MarkdownEditor
        id="markdown-tutorial-editor"
        :text="currentCode"
        :options="editorOptions"
        window-control
        :windowed="tutorialView === 'editor'"
        :window-label="messages.windowEditor"
        :restore-window-label="messages.restoreSplitView"
        @toggle-window="togglePanelView('editor')"
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
  grid-template-columns: minmax(0, 37fr) minmax(0, 63fr);
}

.tutorial--instructions,
.tutorial--editor {
  grid-template-columns: minmax(0, 1fr);
}

.tutorial--instructions .tutorial__editor-panel,
.tutorial--editor .instruction {
  display: none;
}

.instruction {
  position: relative;
  min-width: 0;
  min-height: 0;
  padding: 0 32px 28px;
  overflow-y: auto;
  border-right: 1px solid var(--vp-c-divider);
  font-size: 15px;
  overscroll-behavior: contain;
}

.tutorial--instructions .instruction {
  border-right: 0;
}

.tutorial__editor-panel {
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.tutorial__instruction-actions {
  position: sticky;
  z-index: 9;
  top: 0;
  float: right;
  display: flex;
  min-height: 48px;
  margin-right: -12px;
  align-items: center;
  gap: 2px;
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
  #show-result {
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

@media (max-width: 959px) {
  .tutorial {
    height: calc(100dvh - var(--vp-nav-height, 64px) - 48px);
    min-height: 0;
  }
}

@media (max-width: 900px) {
  .tutorial {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 45fr) minmax(0, 55fr);
  }

  .tutorial--instructions,
  .tutorial--editor {
    grid-template-rows: minmax(0, 1fr);
  }

  .instruction {
    height: 100%;
    padding: 0 20px 24px;
    overflow-y: auto;
    border-right: 0;
    border-bottom: 1px solid var(--vp-c-divider);
  }

  .tutorial__editor-panel {
    height: 100%;
    min-height: 0;
  }

  .tutorial--instructions .instruction {
    border-bottom: 0;
  }

  .tutorial :deep(.markdown-editor) {
    --md-editor-height: 100%;
    height: 100%;
    min-height: 0;
    border-bottom: 1px solid var(--vp-c-divider);
  }
}
</style>
