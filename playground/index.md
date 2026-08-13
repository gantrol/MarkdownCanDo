---
layout: page
title: WYSIWYG Markdown Editor with Live Preview
description: Write and format Markdown online with source, WYSIWYG, split, and preview modes. Your document stays in the current browser session.
footer: false
---

<main class="playground-page" aria-labelledby="playground-title">
  <section class="practice-seo-copy practice-seo-copy--intro">
    <h1 id="playground-title">WYSIWYG Markdown Editor with Live Preview</h1>
    <p>Write Markdown in the view that fits your task. Use familiar visual formatting, edit the source directly, or compare source and rendered output side by side.</p>
    <ul class="practice-seo-highlights">
      <li><strong>Four views:</strong> WYSIWYG, source, split, and preview-only modes.</li>
      <li><strong>Rich Markdown:</strong> tables, task lists, code, math, Mermaid diagrams, and music notation.</li>
      <li><strong>Browser based:</strong> no account or installation is required.</li>
    </ul>
  </section>

  <MarkdownEditor id="playground-md-editor" :text="text" :options="editorOptions" />

  <section class="practice-seo-copy practice-seo-copy--after">
    <h2>How to use the online Markdown editor</h2>
    <ol>
      <li>Choose WYSIWYG for visual formatting or source mode to write Markdown syntax directly.</li>
      <li>Use split view to compare the source with the rendered result.</li>
      <li>Copy the finished Markdown before leaving or refreshing the page.</li>
    </ol>

    <h2>Learn and reference Markdown</h2>
    <p>New to the format? Start with the <a href="/tutorial/">interactive Markdown tutorial</a>. For a quick lookup, open the <a href="/reference/cheatsheet/">Markdown cheat sheet</a>, then explore <a href="/showcase/">diagram and math examples</a>.</p>

    <h2>Frequently asked questions</h2>
    <details>
      <summary>Does the editor upload my document?</summary>
      <p>The editor is designed to process your text in the browser. It does not provide cloud storage, so copy your work before leaving the page.</p>
    </details>
    <details>
      <summary>What is the difference between WYSIWYG and source mode?</summary>
      <p>WYSIWYG shows familiar formatting controls, while source mode exposes the Markdown characters directly.</p>
    </details>
    <details>
      <summary>Can I use this editor on a phone?</summary>
      <p>Yes. The interface adapts to smaller screens, although a wider screen is more comfortable for split view.</p>
    </details>
  </section>
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
