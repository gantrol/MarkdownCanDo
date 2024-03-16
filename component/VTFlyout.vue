<script lang="ts" setup>
import { ref } from 'vue'
import { MenuItem, MenuItemChild } from './types/menu'
import { useFocusContainer } from './composables/FocusContainer'
import VTIconChevronDown from './icons/VTIconChevronDown.vue'
import VTIconMoreHorizontal from './icons/VTIconMoreHorizontal.vue'
import VTMenu from './VTMenu.vue'

const props = defineProps<{
  button?: string
  items?: (MenuItem | MenuItemChild)[]
  label?: string
}>()

const open = ref(false)
const elRef = ref<HTMLElement>()
const onBlur = () => { open.value = false }

useFocusContainer({
  elRef,
  onBlur
})
</script>

<template>
  <div
    class="vt-flyout"
    ref="elRef"
    @mouseenter="open = true"
    @mouseleave="open = false"
  >
    <button
      type="button"
      class="vt-flyout-button"
      aria-haspopup="true"
      :aria-expanded="open"
      :aria-label="label"
      @click="open = !open"
    >
      <slot name="btn-slot">
        <span v-if="props.button" class="vt-flyout-button-text">
          {{ props.button }}
          <VTIconChevronDown class="vt-flyout-button-text-icon" />
        </span>

        <VTIconMoreHorizontal v-else class="vt-flyout-button-icon" />
      </slot>
    </button>

    <div class="vt-flyout-menu">
      <VTMenu :items="items">
        <slot />
      </VTMenu>
    </div>
  </div>
</template>

<style>
  @import './vt-doc-base.css';
  @import './vt-doc-code.css';
  @import './vt-doc-custom-blocks.css';


  .vt-flyout {
    position: relative;
  }

  .vt-flyout:hover {
    color: var(--vt-c-bland);
    transition: color .25s;
  }

  .vt-flyout:hover .vt-flyout-button-text {
    color: var(--vt-c-text-2);
  }

  .vt-flyout:hover .vt-flyout-button-icon {
    fill: var(--vt-c-text-2);
  }

  .vt-flyout:hover .vt-flyout-menu,
  .vt-flyout-button[aria-expanded="true"] + .vt-flyout-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .vt-flyout-button {
    display: flex;
    align-items: center;
    padding: 0 12px;
    height: var(--vt-nav-height);
    color: var(--vt-c-text-1);
    transition: color .5s;
  }

  .vt-flyout-button-text {
    display: flex;
    align-items: center;
    line-height: var(--vt-nav-height);
    font-size: 13px;
    font-weight: 500;
    color: var(--vt-c-text-1);
    transition: color .25s;
    white-space: nowrap;
  }

  .vt-flyout-button-text-icon {
    margin-left: 4px;
    width: 14px;
    height: 14px;
    fill: currentColor;
  }

  .vt-flyout-button-icon {
    width: 20px;
    height: 20px;
    fill: currentColor;
    transition: fill .25s;
  }

  .vt-flyout-menu {
    display: flex;
    position: absolute;
    top: calc(var(--vt-nav-height) / 2 + 15px);
    right: 0;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-4px);
    transition: opacity .25s, visibility .25s, transform .25s;
    max-height: calc(100vh - var(--vt-nav-height));
  }
</style>
