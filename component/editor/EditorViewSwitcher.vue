<script setup lang="ts">
import type { EditorViewItem, EditorViewMode } from './types'

defineProps<{
  items: EditorViewItem[]
  modelValue: EditorViewMode
  label: string
}>()

const emit = defineEmits<{
  'update:modelValue': [mode: EditorViewMode]
}>()
</script>

<template>
  <div class="markdown-editor__view-switcher" role="group" :aria-label="label">
    <button
      v-for="item in items"
      :key="item.mode"
      type="button"
      class="markdown-editor__view-button"
      :class="[`markdown-editor__view--${item.mode}`, { 'is-active': modelValue === item.mode }]"
      :aria-label="item.label"
      :aria-pressed="modelValue === item.mode"
      :title="item.label"
      @click="emit('update:modelValue', item.mode)"
    >
      <component :is="item.icon" :size="16" :stroke-width="1.8" aria-hidden="true" />
      <span>{{ item.label }}</span>
    </button>
  </div>
</template>
