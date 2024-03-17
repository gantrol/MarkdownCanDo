---
layout: page
footer: false
---

<VditorComponent id="playground-md-editor" :text="text" />

<script setup>
import VditorComponent from "/component/MarkdownEditorV.vue";
import text from '../guide/index.md?raw';

</script>

<style setup>
#playground-md-editor {
  max-width: 80vw;
  margin: auto;
}
</style>
