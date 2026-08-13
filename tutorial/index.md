---
layout: page
title: Interactive Markdown Tutorial for Beginners
description: Learn Markdown step by step with short explanations, editable examples, hints, and instant browser-based practice.
aside: false
footer: false
returnToTop: false
published: true
---

[//]: # (// first version of this file copy from: https://github.com/vuejs/docs/blob/main/src/tutorial/)

<section class="practice-seo-copy practice-seo-copy--intro">
  <h1>Interactive Markdown Tutorial for Beginners</h1>
  <p>Learn Markdown by editing real examples. Each lesson introduces one idea, lets you change the source, and shows the result immediately in your browser.</p>
  <ul class="practice-seo-highlights">
    <li><strong>Step by step:</strong> start with headings and text, then move to links, lists, tables, and richer content.</li>
    <li><strong>Hands on:</strong> change every example instead of memorizing syntax.</li>
    <li><strong>Private practice:</strong> your edits stay in the current browser session.</li>
  </ul>
  <h2>Start the tutorial</h2>
</section>

<script>
import { defineAsyncComponent } from 'vue';
import ReplLoading from '@theme/components/ReplLoading.vue';
import { data } from './tutorial.data';

export default {
  components: {
    TutorialRepl: defineAsyncComponent({
      loader: () => import('../component/TutorialRepl.vue'),
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
    <TutorialRepl :data="data" hintText="Show me!" resetText="Reset" previousButtonText="Prev" nextButtonText="Next"/>
</ClientOnly>

<section class="practice-seo-copy practice-seo-copy--after">
  <h2>How to use this Markdown tutorial</h2>
  <ol>
    <li>Read the instruction for the current lesson.</li>
    <li>Edit the Markdown in the hands-on panel and compare it with the preview.</li>
    <li>Use the hint only when you need it, then continue to the next step.</li>
  </ol>

  <h2>What to learn next</h2>
  <p>Keep the <a href="/reference/cheatsheet/">Markdown cheat sheet</a> nearby, try a longer document in the <a href="/playground/">WYSIWYG Markdown editor</a>, or browse practical <a href="/showcase/">Markdown examples</a>.</p>

  <h2>Frequently asked questions</h2>
  <details>
    <summary>Do I need to install anything?</summary>
    <p>No. The tutorial runs in a modern web browser and does not require an account.</p>
  </details>
  <details>
    <summary>Is this tutorial suitable for complete beginners?</summary>
    <p>Yes. It begins with basic formatting and introduces one concept at a time.</p>
  </details>
  <details>
    <summary>Where can I check a syntax quickly?</summary>
    <p>Use the <a href="/reference/cheatsheet/">complete Markdown cheat sheet</a> for a compact reference.</p>
  </details>
</section>
