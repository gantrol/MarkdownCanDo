<script setup lang="ts">
import { useId } from 'vue'

defineProps<{
  modelValue: string
  label: string
  ariaLabel: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputId = `home-markdown-source-${useId().replace(/[^a-z0-9_-]/giu, '-')}`

function handleInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
}
</script>

<template>
  <section class="home-product-visual__source">
    <label class="home-product-visual__pane-label" :for="inputId">{{ label }}</label>
    <textarea
      :id="inputId"
      :value="modelValue"
      :aria-label="ariaLabel"
      autocomplete="off"
      autocapitalize="off"
      autocorrect="off"
      spellcheck="false"
      @input="handleInput"
    />
  </section>
</template>
