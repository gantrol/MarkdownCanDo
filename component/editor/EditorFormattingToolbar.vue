<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { EditorToolbarGroup, EditorToolbarOption } from './types'

defineProps<{
  groups: EditorToolbarGroup[]
  label: string
}>()

const root = ref<HTMLElement>()
const openMenu = ref<string>()

function toggleMenu(key: string) {
  openMenu.value = openMenu.value === key ? undefined : key
}

function runOption(event: MouseEvent, option: EditorToolbarOption) {
  openMenu.value = undefined
  void option.action()
}

function closeOnOutsidePointer(event: PointerEvent) {
  if (root.value?.contains(event.target as Node)) return
  openMenu.value = undefined
}

onMounted(() => document.addEventListener('pointerdown', closeOnOutsidePointer))
onBeforeUnmount(() => document.removeEventListener('pointerdown', closeOnOutsidePointer))
</script>

<template>
  <div ref="root" class="markdown-editor__formatting-tools" role="toolbar" :aria-label="label">
    <div
      v-for="group in groups"
      :key="group.key"
      class="markdown-editor__tool-group"
      role="group"
      :aria-label="group.label"
    >
      <template
        v-for="item in group.items"
        :key="item.key"
      >
        <div v-if="item.options?.length" class="markdown-editor__tool-menu">
          <button
            type="button"
            class="markdown-editor__tool markdown-editor__tool--menu"
            :class="`markdown-editor__tool--${item.key}`"
            :aria-label="item.label"
            aria-haspopup="menu"
            :aria-expanded="openMenu === item.key"
            :title="item.label"
            @mousedown.prevent
            @click="toggleMenu(item.key)"
          >
            <component :is="item.icon" :size="17" :stroke-width="1.8" aria-hidden="true" />
            <span class="markdown-editor__tool-chevron" aria-hidden="true">⌄</span>
          </button>
          <div v-if="openMenu === item.key" class="markdown-editor__tool-dropdown" role="menu" :aria-label="item.label">
            <button
              v-for="option in item.options"
              :key="option.key"
              type="button"
              role="menuitem"
              :aria-keyshortcuts="option.shortcut"
              @mousedown.prevent
              @click="runOption($event, option)"
            >
              <span>{{ option.label }}</span>
              <kbd v-if="option.shortcut">{{ option.shortcut }}</kbd>
            </button>
          </div>
        </div>
        <button
          v-else
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
      </template>
    </div>
  </div>
</template>
