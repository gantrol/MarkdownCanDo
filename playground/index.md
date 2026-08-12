---
layout: page
title: Markdown Playground
description: Switch between Markdown source, WYSIWYG editing, and a safe live preview. Changes stay in your browser.
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
