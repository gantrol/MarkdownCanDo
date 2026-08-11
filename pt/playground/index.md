---
layout: page
title: Playground de Markdown
footer: false
---

<main class="playground-page">
  <header>
    <h1>Playground de Markdown</h1>
    <p>Alterne entre o código Markdown, a edição visual e a pré-visualização segura. As alterações ficam no seu navegador.</p>
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
