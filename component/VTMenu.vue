<!--copy from https://github.com/vuejs/theme-->
<script lang="ts" setup>
import type { MenuItem, MenuItemChild } from './types/menu'
import VTMenuLink from './VTMenuLink.vue'
import VTMenuGroup from './VTMenuGroup.vue'

defineProps<{
  items?: (MenuItem | MenuItemChild)[]
  labelledby?: string
}>()
</script>

<template>
  <nav class="vt-menu" :aria-labelledby="labelledby">
    <ul v-if="items" class="vt-menu-items">
      <li
        v-for="(item, index) in items"
        :key="item.text || index"
        class="vt-menu-item"
      >
        <VTMenuLink v-if="'link' in item" :item="item" />
        <VTMenuGroup v-else :text="item.text" :items="item.items" />
      </li>
    </ul>

    <div v-if="$slots.default" class="vt-menu-slot">
      <slot />
    </div>
  </nav>
</template>

<style>
  .vt-menu {
    border-radius: 8px;
    padding: 12px 0;
    min-width: 192px;
    border: 1px solid transparent;
    background: var(--vt-c-bg);
    box-shadow: var(--vt-shadow-3);
    transition: background-color .5s;
    overflow: auto;
  }

  .dark .vt-menu {
    background: var(--vt-c-bg);
    box-shadow: var(--vt-shadow-1);
    border: 1px solid var(--vt-c-divider-light);
  }

  .vt-menu-items {
    margin: 0;
    padding: 0;
    list-style: none;
    transition: border-color .5s;
  }

  .vt-menu-item {
    margin: 0;
    padding: 0;
  }

  .vt-menu-item + .vt-menu-item > .vt-menu-group {
    border-top: 1px solid var(--vt-c-divider-light);
    padding-top: 11px;
  }

  @media (prefers-reduced-motion: reduce) {
    .vt-menu,
    .vt-menu-items {
      transition: none;
    }
  }

</style>
