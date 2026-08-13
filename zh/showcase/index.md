---
layout: page
title: Markdown 示例：图表、公式与更多用法
description: 浏览并编辑 Mermaid 流程图、时间线、思维导图、甘特图、数学公式、脚注等 Markdown 完整示例。
aside: false
footer: false
outline: false
---

<section class="practice-seo-copy practice-seo-copy--intro">
  <h1>Markdown 示例：图表、公式与更多用法</h1>
  <p>这些完整示例不止包含加粗和列表。选择一个示例，对照 Markdown 源码与实时预览，再直接修改内容观察变化。</p>
  <ul class="practice-seo-highlights">
    <li><strong>图表：</strong>使用 Mermaid 编写流程图、时间线、思维导图和甘特图。</li>
    <li><strong>技术内容：</strong>体验公式、代码、表格与脚注。</li>
    <li><strong>可以复用：</strong>把示例改成适合文档、笔记或项目 README 的内容。</li>
  </ul>
  <h2>浏览可编辑示例</h2>
</section>

<script>
import { defineAsyncComponent } from 'vue';
import ReplLoading from '@theme/components/ReplLoading.vue';
import {data} from "./showcases.data";

export default {
  components: {
    ShowCaseRepl: defineAsyncComponent({
      loader: () => import('/component/ShowCaseRepl.vue'),
      loadingComponent: ReplLoading
    })
  },
  data () {
    return {
      data
    };
  }
}
</script>

<ClientOnly>
  <ShowCaseRepl :data="data"/>
</ClientOnly>

<section class="practice-seo-copy practice-seo-copy--after">
  <h2>如何复用示例</h2>
  <ol>
    <li>选择示例，对照查看源码和预览。</li>
    <li>修改文字、数据或结构，直到结果符合你的文档需求。</li>
    <li>把 Markdown 复制到支持相应扩展语法的编辑器或发布平台。</li>
  </ol>

  <h2>继续学习</h2>
  <p>用 <a href="/zh/reference/cheatsheet/">Markdown 语法速查表</a>核对基础语法，从<a href="/zh/tutorial/">交互教程</a>开始系统练习，或在<a href="/zh/playground/">在线 Markdown 编辑器</a>中创建自己的文档。</p>

  <h2>常见问题</h2>
  <details>
    <summary>所有 Markdown 编辑器都支持这些示例吗？</summary>
    <p>不一定。基础语法兼容性较好，但 Mermaid、数学公式和脚注需要编辑器或发布平台提供支持。</p>
  </details>
  <details>
    <summary>可以直接修改示例吗？</summary>
    <p>可以。示例专为动手实验设计，修改内容只保留在当前浏览器会话中。</p>
  </details>
</section>
