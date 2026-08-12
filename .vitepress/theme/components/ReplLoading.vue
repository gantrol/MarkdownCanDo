<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { replLoadingMessages, resolveUiLocaleTag } from '../../../utils/i18n'

const props = defineProps<{
  message?: string
}>()

const { lang } = useData()
const loadingMessage = computed(() => {
  if (props.message) return props.message
  return replLoadingMessages[resolveUiLocaleTag(lang.value)]
})
</script>

<template>
  <div
    class="repl-loading"
    role="status"
    aria-live="polite"
    aria-atomic="true"
    aria-busy="true"
  >
    <div class="lds-ring" aria-hidden="true">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div>{{ loadingMessage }}</div>
  </div>
</template>

<style>
.repl-loading {
  font-weight: 600;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 66vh;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 32px;
  height: 32px;
  margin: 4px;
  border: 4px solid;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: var(--vt-c-brand) transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .lds-ring {
    display: none;
  }
}
</style>
