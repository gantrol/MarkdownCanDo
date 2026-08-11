---
layout: page
title: Examples
sidebar: false
aside: false
footer: false
outline: false
---

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
