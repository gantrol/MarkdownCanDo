---
layout: page
title: Markdown Examples for Diagrams, Math, and More
description: Explore editable Markdown examples for Mermaid flowcharts, timelines, mind maps, Gantt charts, math, footnotes, and other rich content.
aside: false
footer: false
outline: false
---

<section class="practice-seo-copy practice-seo-copy--intro">
  <h1>Markdown Examples for Diagrams, Math, and More</h1>
  <p>Explore complete examples that go beyond bold text and lists. Select an example, inspect its Markdown source, edit it, and compare the live preview.</p>
  <ul class="practice-seo-highlights">
    <li><strong>Diagrams:</strong> flowcharts, timelines, mind maps, and Gantt charts with Mermaid.</li>
    <li><strong>Technical content:</strong> formulas, code, tables, and footnotes.</li>
    <li><strong>Reusable source:</strong> adapt the examples for documentation, notes, and project READMEs.</li>
  </ul>
  <h2>Explore the editable examples</h2>
</section>

<script>
import { defineAsyncComponent } from 'vue';
import ReplLoading from '@theme/components/ReplLoading.vue';
import {data} from "./showcases.data";

export default {
  components: {
    ShowCaseRepl: defineAsyncComponent({
      loader: () => import('../component/ShowCaseRepl.vue'),
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
  <h2>How to reuse an example</h2>
  <ol>
    <li>Choose an example and read its source beside the preview.</li>
    <li>Change labels, values, or structure until the result matches your document.</li>
    <li>Copy the Markdown into an editor that supports the extension being used.</li>
  </ol>

  <h2>Continue learning</h2>
  <p>Review standard syntax in the <a href="/reference/cheatsheet/">Markdown cheat sheet</a>, practice from the beginning in the <a href="/tutorial/">interactive tutorial</a>, or create your own document in the <a href="/playground/">online Markdown editor</a>.</p>

  <h2>Frequently asked questions</h2>
  <details>
    <summary>Does every Markdown editor support these examples?</summary>
    <p>No. Basic syntax is widely supported, but Mermaid, math, and footnotes depend on the editor or publishing platform.</p>
  </details>
  <details>
    <summary>Can I change the examples?</summary>
    <p>Yes. The showcase is designed for experimentation, and changes remain in the current browser session.</p>
  </details>
</section>
