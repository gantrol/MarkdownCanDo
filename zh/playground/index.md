---
layout: page
title: Markdown 所见即所得在线编辑器
description: 在线编写和排版 Markdown，自由切换所见即所得、源码、分栏与预览模式，文档仅保留在当前浏览器会话中。
footer: false
---

<main class="playground-page" aria-labelledby="playground-title">
  <section class="practice-seo-copy practice-seo-copy--intro">
    <h1 id="playground-title">Markdown 所见即所得在线编辑器</h1>
    <p>根据任务自由选择编辑方式：像 Word 一样使用可视化工具栏，直接编写 Markdown 源码，或在分栏中对照源码与渲染结果。</p>
    <ul class="practice-seo-highlights">
      <li><strong>四种视图：</strong>所见即所得、源码、分栏和仅预览。</li>
      <li><strong>丰富语法：</strong>支持表格、任务列表、代码、公式、Mermaid 图表和五线谱。</li>
      <li><strong>浏览器使用：</strong>不需要注册账号或安装软件。</li>
    </ul>
  </section>

  <MarkdownEditor id="playground-md-editor" :text="text" :options="editorOptions" />

  <section class="practice-seo-copy practice-seo-copy--after">
    <h2>如何使用在线 Markdown 编辑器</h2>
    <ol>
      <li>需要可视化排版时选择所见即所得，需要精确控制语法时切换到源码模式。</li>
      <li>使用分栏视图同时核对源码和渲染结果。</li>
      <li>离开或刷新页面前复制完成的 Markdown 文档。</li>
    </ol>

    <h2>学习和查询 Markdown</h2>
    <p>第一次接触 Markdown，可以先完成<a href="/zh/tutorial/">交互式入门教程</a>；忘记语法时打开 <a href="/zh/reference/cheatsheet/">Markdown 语法速查表</a>，还可以参考<a href="/zh/showcase/">图表与公式示例</a>。</p>

    <h2>常见问题</h2>
    <details>
      <summary>编辑器会上传我的文档吗？</summary>
      <p>编辑器按设计在浏览器中处理文字，不提供云端存储，因此离开页面前请复制并保存内容。</p>
    </details>
    <details>
      <summary>所见即所得和源码模式有什么区别？</summary>
      <p>所见即所得模式提供熟悉的排版按钮，源码模式则直接显示 Markdown 符号。</p>
    </details>
    <details>
      <summary>可以在手机上使用吗？</summary>
      <p>可以。界面会适应小屏幕，但分栏编辑在较宽的屏幕上更舒适。</p>
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
