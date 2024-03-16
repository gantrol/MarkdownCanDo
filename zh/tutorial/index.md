---
layout: page
page: true
title: 教程
sidebar: false
aside: false
footer: false
returnToTop: false
published: true
---

[//]: # (// first version of this file copy from: https://github.com/vuejs/docs/blob/main/src/tutorial/)

<script>
import { defineAsyncComponent } from 'vue';
import ReplLoading from '@theme/components/ReplLoading.vue';
import { data } from './tutorial.data';

export default {
  components: {
    TutorialRepl: defineAsyncComponent({
      loader: () => import('../../component/TutorialRepl.vue'),
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
