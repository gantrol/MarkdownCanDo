<script setup lang="ts">
import { Check, Copy, Maximize2, Minimize2 } from '@lucide/vue'

defineProps<{
  label: string
  copyLabel: string
  copiedLabel: string
  fullscreenLabel: string
  copyState: 'idle' | 'copied'
  isFullscreen: boolean
}>()

const emit = defineEmits<{
  copy: []
  fullscreen: []
}>()
</script>

<template>
  <div class="markdown-editor__toolbar-actions" role="group" :aria-label="label">
    <button
      type="button"
      class="markdown-editor__tool markdown-editor__copy"
      :aria-label="copyState === 'copied' ? copiedLabel : copyLabel"
      :title="copyLabel"
      @click="emit('copy')"
    >
      <Check v-if="copyState === 'copied'" :size="17" :stroke-width="2" aria-hidden="true" />
      <Copy v-else :size="17" :stroke-width="1.8" aria-hidden="true" />
    </button>
    <button
      type="button"
      class="markdown-editor__tool markdown-editor__fullscreen"
      :aria-label="fullscreenLabel"
      :title="fullscreenLabel"
      @click="emit('fullscreen')"
    >
      <Minimize2 v-if="isFullscreen" :size="17" :stroke-width="1.8" aria-hidden="true" />
      <Maximize2 v-else :size="17" :stroke-width="1.8" aria-hidden="true" />
    </button>
  </div>
</template>
