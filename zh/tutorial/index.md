---
layout: page
page: true
title: Markdown 入门交互教程
description: 通过简短讲解、可编辑示例、提示和即时预览，循序渐进地学习 Markdown 基础语法。
aside: false
footer: false
returnToTop: false
published: true
---

[//]: # (// first version of this file copy from: https://github.com/vuejs/docs/blob/main/src/tutorial/)

<section class="practice-seo-copy practice-seo-copy--intro">
  <h1>Markdown 入门交互教程</h1>
  <p>边改边学 Markdown。每一步只介绍一个知识点，你可以直接修改源码，并在浏览器里立即查看结果。</p>
  <ul class="practice-seo-highlights">
    <li><strong>循序渐进：</strong>从标题和文字格式开始，再学习链接、列表、表格等内容。</li>
    <li><strong>动手练习：</strong>每个示例都可以修改，不必死记语法。</li>
    <li><strong>本地处理：</strong>练习内容仅保留在当前浏览器会话中。</li>
  </ul>
  <h2>开始教程</h2>
</section>

<script>
import { defineAsyncComponent } from 'vue';
import ReplLoading from '@theme/components/ReplLoading.vue';
import { data } from './tutorial.data';

export default {
  components: {
    TutorialRepl: defineAsyncComponent({
      loader: () => import('/component/TutorialRepl.vue'),
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
    <TutorialRepl :data="data" hintText="看看答案" resetText="我不看了" previousButtonText="上一篇" nextButtonText="下一篇"/>

</ClientOnly>

<section class="practice-seo-copy practice-seo-copy--after">
  <h2>如何使用这份教程</h2>
  <ol>
    <li>阅读当前步骤的说明。</li>
    <li>在编辑区修改 Markdown，并对照预览结果。</li>
    <li>遇到困难时查看提示，理解后再进入下一步。</li>
  </ol>

  <h2>接下来学什么</h2>
  <p>把 <a href="/zh/reference/cheatsheet/">Markdown 语法速查</a>加入书签，在<a href="/zh/playground/">所见即所得编辑器</a>中写一篇完整文档，或浏览更多 <a href="/zh/showcase/">Markdown 示例</a>。</p>

  <h2>常见问题</h2>
  <details>
    <summary>需要安装软件吗？</summary>
    <p>不需要。使用现代浏览器即可学习，也不需要注册账号。</p>
  </details>
  <details>
    <summary>完全没有基础也能学吗？</summary>
    <p>可以。教程从最基本的文字格式开始，每一步只增加一个新概念。</p>
  </details>
  <details>
    <summary>忘记语法时去哪里查？</summary>
    <p>可以打开<a href="/zh/reference/cheatsheet/">完整 Markdown 语法速查表</a>快速核对。</p>
  </details>
</section>
