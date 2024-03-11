
<template>
  <section class="tutorial">
    <article class="instruction" ref="instruction">
      <VTFlyout :button="`${currentStepIndex} / ${totalSteps}`">
        <VTLink
            v-for="(step, i) of allSteps"
            class="vt-menu-link"
            :class="{ active: i + 1 === currentStepIndex }"
            :href="step.link"
        >{{ step.text }}</VTLink
        >
      </VTFlyout>
      <div class="vt-doc" v-html="currentDescription"></div>
      <div class="hint" v-if="data[currentStep]?._hint">
        <button id="show-result" @click="toggleResult">
          {{ showingHint ? '重置' : '看看答案' }}
        </button>
      </div>
      <footer>
        <a v-if="prevStep" :href="`#${prevStep}`"
        ><VTIconChevronLeft class="vt-link-icon" style="margin: 0" />
          Prev</a
        >
        <a class="next-step" v-if="nextStep" :href="`#${nextStep}`"
        >Next <VTIconChevronRight class="vt-link-icon"
        /></a>
      </footer>
    </article>
    <MarkdownEditorV :id="'markdown-editor'" :text="currentCode" :options="editorOptions" />
  </section>
</template>

<script setup lang="ts">
import {ref, computed, nextTick} from 'vue';
import MarkdownEditorV from '../../component/MarkdownEditorV.vue';
import { data } from './tutorial.data';
import {
  VTFlyout,
  VTIconChevronLeft,
  VTIconChevronRight,
  VTLink
} from '@vue/theme'
import {onHashChange} from "../examples/utils";

const instruction = ref<HTMLElement>()
// Mark: Steps
const currentStep = ref('step-1');
const currentText = ref("");

const currentDescription = computed(() => {
  return data[currentStep.value]?.['description.md'] || 'No description available.';
});

const currentCode = computed(() => {
  const result = data[currentStep.value]?.["App"]?.['template.md'] || '// No example code available.';
  currentText.value = result
  return result;
});


const currentStepIndex = computed(() => Object.keys(data).indexOf(currentStep.value) + 1);

const prevStep = computed(() => {
  const currentIndex = Object.keys(data).indexOf(currentStep.value);
  return currentIndex > 0 ? Object.keys(data)[currentIndex - 1] : null;
});

const nextStep = computed(() => {
  const currentIndex = Object.keys(data).indexOf(currentStep.value);
  return currentIndex < totalSteps - 1 ? Object.keys(data)[currentIndex + 1] : null;
});

const keys = Object.keys(data).sort((a, b) => {
  return Number(a.replace(/^step-/, '')) - Number(b.replace(/^step-/, ''))
});

const totalSteps = keys.length;
const titleRE = /<h1.*?>(.+?)<a class="header-anchor/
const allSteps = keys.map((key, i) => {
  const desc = data[key]['description.md'] as string
  return {
    text: `${i + 1}. ${desc.match(titleRE)![1]}`,
    link: `#${key}`
  }
})

// Mark: Hint
const showingHint = ref(false)


function updateExample(scroll = false) {
  let hash = location.hash.slice(1)
  if (!data.hasOwnProperty(hash)) {
    hash = 'step-1'
    // TODO: 处理多语言
    location.replace(`${location}/#${hash}`)
  }
  currentStep.value = hash
  currentText.value = showingHint.value ? data[hash]._hint! : data[hash];
  // TODO: update hint
  // TODO: update currentCode


  if (scroll) {
    nextTick(() => {
      instruction.value!.scrollTop = 0
    })
  }
}


const editorOptions = ref({
  height: window.innerHeight - document.getElementsByClassName("VPNavBar")?.[0]?.clientHeight,
  width: window.innerWidth * 0.6,
  mode: "sv",
  preview: {
    delay: 100,
  }
});

function toggleResult() {
  showingHint.value = !showingHint.value
  updateExample()
}

onHashChange(() => {
  showingHint.value = false
  updateExample(true)
})

updateExample()

</script>


<style scoped>
.tutorial {
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
}

.instruction {
  width: 45%;
  padding: 0 32px 24px;
  border-right: 1px solid var(--vt-c-divider-light);
  font-size: 15px;
  overflow-y: auto;
  position: relative;
  --vt-nav-height: 40px;
}

.vt-flyout {
  z-index: 9;
  position: absolute;
  right: 20px;
}

.vt-menu-link.active {
  font-weight: 500;
  color: var(--vt-c-brand);
}

footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--vt-c-divider);
  margin-top: 1.5em;
  padding-top: 1em;
}

footer a {
  font-weight: 500;
  color: var(--vt-c-brand);
}

.next-step {
  margin-left: auto;
}

.vt-doc :deep(h1) {
  font-size: 1.4em;
  margin: 1em 0;
}

.vt-doc :deep(h2) {
  font-size: 1.1em;
  margin: 1.2em 0 0.5em;
  padding: 0;
  border-top: none;
}

.vt-doc :deep(.header-anchor) {
  display: none;
}

.vt-doc :deep(summary) {
  cursor: pointer;
}

.hint {
  padding-top: 1em;
}

#show-result {
  background-color: var(--vt-c-brand);
  color: var(--vt-c-bg);
  padding: 4px 12px 3px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
}

@media (min-width: 1377px) {
  .vue-repl {
    border-right: 1px solid var(--vt-c-divider-light);
  }
}

@media (min-width: 1441px) {
  .tutorial {
    padding-right: 32px;
  }
}

:deep(.narrow) {
  display: none;
}

@media (max-width: 720px) {
  .tutorial {
    display: block;
  }
  .instruction {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--vt-c-divider-light);
    height: 30vh;
    padding: 0 24px 24px;
  }
  .vue-repl {
    width: 100%;
    height: calc(
        70vh - var(--vt-nav-height) - var(--vt-banner-height, 0px)
    );
  }
  :deep(.wide) {
    display: none;
  }
  :deep(.narrow) {
    display: inline;
  }
}
</style>
