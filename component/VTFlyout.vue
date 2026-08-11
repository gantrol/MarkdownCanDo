<!--copy from https://github.com/vuejs/theme-->
<script lang="ts" setup>
import { computed, getCurrentInstance, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import type { MenuItem, MenuItemChild } from './types/menu'
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
const buttonRef = ref<HTMLButtonElement>()
const instanceId = getCurrentInstance()?.uid ?? 'default'
const buttonId = `vt-flyout-button-${instanceId}`
const menuId = `vt-flyout-menu-${instanceId}`
const buttonLabel = computed(() => props.label || (!props.button ? 'Menu' : undefined))

function close(returnFocus = false) {
  if (!open.value) return
  open.value = false
  if (returnFocus) nextTick(() => buttonRef.value?.focus())
}

function toggle() {
  open.value = !open.value
}

function onEscape(event: KeyboardEvent) {
  if (!open.value) return
  event.preventDefault()
  event.stopPropagation()
  close(true)
}

function onDocumentPointerDown(event: PointerEvent) {
  if (open.value && !elRef.value?.contains(event.target as Node)) close()
}

function onMenuClick(event: MouseEvent) {
  if (event.target instanceof Element && event.target.closest('a')) close()
}

useFocusContainer({
  elRef,
  onBlur: () => close()
})

onMounted(() => document.addEventListener('pointerdown', onDocumentPointerDown))
onBeforeUnmount(() => document.removeEventListener('pointerdown', onDocumentPointerDown))
</script>

<template>
  <div
    class="vt-flyout"
    :class="{ 'is-open': open }"
    ref="elRef"
    @keydown.esc="onEscape"
  >
    <button
      :id="buttonId"
      ref="buttonRef"
      type="button"
      class="vt-flyout-button"
      :aria-controls="menuId"
      :aria-expanded="open"
      :aria-label="buttonLabel"
      @click="toggle"
    >
      <slot name="btn-slot">
        <span v-if="props.button" class="vt-flyout-button-text">
          {{ props.button }}
          <VTIconChevronDown class="vt-flyout-button-text-icon" />
        </span>

        <VTIconMoreHorizontal v-else class="vt-flyout-button-icon" />
      </slot>
    </button>

    <div
      :id="menuId"
      class="vt-flyout-menu"
      :aria-hidden="!open"
      :inert="!open"
      @click="onMenuClick"
    >
      <VTMenu :items="items" :labelledby="buttonId">
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
    color: var(--vt-c-brand);
    transition: color .25s;
  }

  .vt-flyout:hover .vt-flyout-button-text {
    color: var(--vt-c-text-2);
  }

  .vt-flyout:hover .vt-flyout-button-icon {
    fill: var(--vt-c-text-2);
  }

  .vt-flyout.is-open .vt-flyout-menu {
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

  .vt-flyout-button:focus-visible {
    border-radius: 6px;
    outline: 2px solid var(--vt-c-brand);
    outline-offset: -2px;
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

  @media (prefers-reduced-motion: reduce) {
    .vt-flyout,
    .vt-flyout-button,
    .vt-flyout-button-text,
    .vt-flyout-button-icon,
    .vt-flyout-menu {
      transition: none;
    }
  }
</style>
