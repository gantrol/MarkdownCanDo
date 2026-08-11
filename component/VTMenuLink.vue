<!--copy from https://github.com/vuejs/theme-->
<script lang="ts" setup>
import VTLink from './VTLink.vue'
import type { MenuItemWithLink } from './types/menu'

defineProps<{ item: MenuItemWithLink }>()
</script>

<template>
  <VTLink class="vt-menu-link" :href="item.link">
    {{ item.text }}
  </VTLink>
</template>

<style>
.vt-menu-link {
  display: block;
  padding: 0 18px;
  line-height: 28px;
  font-size: 13px;
  font-weight: 400;
  color: var(--vt-c-text-1);
  white-space: nowrap;
  transition: color .25s;
}

.vt-menu-link:hover {
  color: var(--vt-c-brand);
}

.vt-menu-link:focus-visible {
  border-radius: 4px;
  outline: 2px solid var(--vt-c-brand);
  outline-offset: -2px;
}

@media (prefers-reduced-motion: reduce) {
  .vt-menu-link {
    transition: none;
  }
}

</style>
