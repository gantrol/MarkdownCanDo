---
layout: page
title: Markdown 练习场
description: 在 Markdown 源文、所见即所得编辑和安全实时预览之间自由切换。修改只保留在当前浏览器中。
footer: false
---

<main class="playground-page">
  <MarkdownEditor id="playground-md-editor" :text="text" :options="editorOptions" />
</main>

<script setup>
import MarkdownEditor from '/component/MarkdownEditor.vue'
import text from '../guide/index.md?raw'

const editorOptions = { mode: 'wysiwyg' }
</script>

<style>
.playground-page {
  width: 100%;
  max-width: 1500px;
  padding: 24px 28px 36px;
  margin: 0 auto;
}
@media (max-width: 767px) {
  .playground-page { padding: 18px 12px 28px; }
}
</style>
