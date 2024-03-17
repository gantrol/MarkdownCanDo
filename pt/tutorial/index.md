---
layout: page
page: true
title: Tutorial
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
    <TutorialRepl :data="data" hintText="Mostre-me!" resetText="Resetar" previousButtonText="Anterior" nextButtonText="Próximo"/>
</ClientOnly>
