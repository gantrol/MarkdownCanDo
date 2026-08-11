<script setup lang="ts">
import type { EditorToolbarGroup } from './types'

defineProps<{
  groups: EditorToolbarGroup[]
  label: string
}>()
</script>

<template>
  <div class="markdown-editor__formatting-tools" role="toolbar" :aria-label="label">
    <div
      v-for="group in groups"
      :key="group.key"
      class="markdown-editor__tool-group"
      role="group"
      :aria-label="group.label"
    >
      <button
        v-for="item in group.items"
        :key="item.key"
        type="button"
        class="markdown-editor__tool"
        :class="`markdown-editor__tool--${item.key}`"
        :aria-label="item.label"
        :aria-keyshortcuts="item.shortcut"
        :title="item.label"
        @mousedown.prevent
        @click="item.action"
      >
        <component :is="item.icon" :size="17" :stroke-width="1.8" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>
