<script setup lang="ts">
import {computed, ref, watchEffect} from "vue";
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
const currentHash = ref(location.hash.slice(1))
let currentCode = computed(() => data[currentHash.value]?.['App']['template.md']);

watchEffect(updateExample, {
  onTrigger(e) {
    console.log(e)
    debugger
  }
})
onHashChange(updateExample)

function updateExample() {
  currentHash.value = location.hash.slice(1);
  // TODO: remove dirty fix for vitepress 1.0.0-rc.45
  if (!data.hasOwnProperty(currentHash.value) && location.pathname.includes('showcase')) {
    currentHash.value = 'mermaid-timeline-claude'
    location.hash = `#${currentHash.value}`
  }
}

const editorOptions = ref({
  mode: "ir",
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
