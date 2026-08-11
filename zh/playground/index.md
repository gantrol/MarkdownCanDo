---
layout: page
title: Markdown 练习场
footer: false
---

<main class="playground-page">
  <header>
    <h1>Markdown 练习场</h1>
    <p>在 Markdown 源文、所见即所得编辑和安全实时预览之间自由切换。修改只保留在当前浏览器中。</p>
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
