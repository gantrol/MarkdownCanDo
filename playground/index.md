---
layout: page
---

<VditorComponent
id="playground-md-editor"
:text="text"/>

<script setup>
import VditorComponent from "/component/MarkdownEditorV.vue";
import text from './playground_example.md?raw';

</script>

<style setup>
#playground-md-editor {
  max-width: 80vw;
  margin: auto;
}
</style>
