<!--copy from https://github.com/vuejs/theme-->
<script lang="ts" setup>
import { getCurrentInstance } from 'vue'
import type { MenuItemChild } from './types/menu'
import VTMenuLink from './VTMenuLink.vue'

defineProps<{
  text?: string
  items: MenuItemChild[]
}>()

const titleId = `vt-menu-group-title-${getCurrentInstance()?.uid ?? 'default'}`
</script>

<template>
  <div class="vt-menu-group">
    <p v-if="text" :id="titleId" class="vt-menu-group-title">{{ text }}</p>

    <ul class="vt-menu-group-items" :aria-labelledby="text ? titleId : undefined">
      <li v-for="(item, index) in items" :key="item.text || index">
        <VTMenuLink v-if="'link' in item" :item="item" />
      </li>
    </ul>
  </div>
</template>

<style>
  .vt-menu-group-title {
    padding: 0 18px;
    line-height: 28px;
    font-size: 10px;
    font-weight: 600;
    color: var(--vt-c-text-3);
    text-transform: uppercase;
    transition: color .25s;
  }

  .vt-menu-group-items {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .vt-menu-group-title {
      transition: none;
    }
  }

</style>
