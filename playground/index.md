---
layout: page
title: Markdown Playground
footer: false
---

<main class="playground-page">
  <header>
    <h1>Markdown Playground</h1>
    <p>Switch between Markdown source, WYSIWYG editing, and a safe live preview. Changes stay in your browser.</p>
  </header>
  <MarkdownEditor id="playground-md-editor" :text="text" />
</main>

<script setup>
import MarkdownEditor from '/component/MarkdownEditor.vue'
import text from '../guide/index.md?raw'
</script>

<style>
.playground-page {
  width: 100%;
  max-width: 1500px;
  padding: 24px 28px 36px;
  margin: 0 auto;
}
.playground-page > header { margin-bottom: 18px; }
.playground-page > header h1 { margin: 0; font-size: clamp(26px, 3vw, 38px); }
.playground-page > header p { margin: 6px 0 0; color: var(--vp-c-text-2); }
@media (max-width: 767px) {
  .playground-page { padding: 18px 12px 28px; }
}
</style>
