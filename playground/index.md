---
layout: page
footer: false
---

<VditorComponent id="playground-md-editor" :text="text"/>

<script setup>
import VditorComponent from "/component/MarkdownEditorV.vue";
import text from '../guide/index.md?raw';

// TODO: quick fix i18n, should be auto config by URL path?
    
</script>

<style setup>
#playground-md-editor {
  max-width: 95vw;
  margin: auto;
}
</style>
