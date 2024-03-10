---
layout: page
---

<VditorComponent id="playground-md-editor" :text="text" :options="options"/>

<script setup>
import VditorComponent from "/component/MarkdownEditorV.vue";
import text from '../guide/index.md?raw';

const options = {
    mode: "wysiwyg"
}
;

</script>

<style setup>
#playground-md-editor {
  max-width: 80vw;
  margin: auto;
}
</style>
