<script setup lang="ts">
import {onMounted, onUnmounted, ref, watchEffect} from "vue";
import {onHashChange} from "../utils/utils.js";
import MarkdownEditorV from './MarkdownEditorV.vue';
import {isLargeWindow} from "../utils/screen_utils";

const props = defineProps({
  data: {
    type: Object,
    require: true,
  }
})

const data = props.data;
let currentCode = '';

watchEffect(updateExample, {
  onTrigger(e) {
    console.log(e)
    debugger
  }
})
onHashChange(updateExample)

function updateExample() {
  let hash = location.hash.slice(1)
  if (!data.hasOwnProperty(hash)) {
    hash = 'mermaid-timeline-claude'
    location.hash = `#${hash}`
  }
  currentCode = data[hash]['App']['template.md']
}

const heightProvider = ref<HTMLDivElement>();
onMounted(() => {
  const set = () => {
    heightProvider.value!.style.setProperty(
        '--vh',
        window.innerHeight + 'px'
    )
  }
  set()
  window.addEventListener('resize', set)

  onUnmounted(() => {
    window.removeEventListener('resize', set)
  })
})

const editorOptions = ref({
  height: window.innerHeight - document.getElementsByClassName("VPNavBar")?.[0]?.clientHeight,
  width: isLargeWindow() ? 0.55 * window.innerWidth : 0.88 * window.innerWidth,
  preview: {
    delay: 100,
  }
});
</script>

<template>
  <div ref="heightProvider">
    <MarkdownEditorV :id="'markdown-editor'" :text="currentCode" :options="editorOptions" />
  </div>
</template>
