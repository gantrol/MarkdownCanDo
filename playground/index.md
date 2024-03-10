---
layout: page
---

<VditorComponent id="playground-md-editor" :text="text" :options="options"/>

<script setup>
import VditorComponent from "/component/MarkdownEditorV.vue";
import text from '../guide/index.md?raw';

// TODO: quick fix i18n, should be auto config by URL path?
const options = {
    mode: "wysiwyg",
    lang: "en_US",
};
    
</script>

<style setup>
#playground-md-editor {
  max-width: 80vw;
  margin: auto;
}
</style>
