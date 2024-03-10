---
layout: page
footer: false
---

<VditorComponent id="playground-md-editor" :text="text" :options="options"/>

<script setup>
import VditorComponent from "/component/MarkdownEditorV.vue";
import text from '../guide/index.md?raw';

const options = {
    mode: "ir",
    height: 0.91 * window.innerHeight
}
;

</script>

<style setup>
#playground-md-editor {
  max-width: 80vw;
  margin: auto;
}
</style>
