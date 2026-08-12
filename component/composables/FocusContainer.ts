// copy from https://github.com/vuejs/theme
import { onUnmounted, readonly, ref, watch } from 'vue'
import type { Ref } from 'vue'

interface FocusContainerOptions {
  elRef: Ref<HTMLElement | undefined>
  onFocus?: () => void
  onBlur?: () => void
}

export const focusedElement = ref<HTMLElement>()
let active = false
let listeners = 0

export function useFocusContainer(options: FocusContainerOptions) {
  const containsFocus = ref(false)
  if (typeof window !== 'undefined') {
    !active && activateFocusTracking()
    listeners++

    const unwatch = watch(focusedElement, (el) => {
      const nextContainsFocus = Boolean(
        el === options.elRef.value ||
        options.elRef.value?.contains(el as Node)
      )

      if (nextContainsFocus === containsFocus.value) {
        return
      }

      containsFocus.value = nextContainsFocus
      if (nextContainsFocus) options.onFocus?.()
      else options.onBlur?.()
    })

    onUnmounted(() => {
      unwatch()
      listeners--
      if (!listeners) {
        deactivateFocusTracking()
      }
    })
  }

  return readonly(containsFocus)
}

function activateFocusTracking() {
  document.addEventListener('focusin', handleFocusIn)
  active = true
  focusedElement.value = document.activeElement as HTMLElement
}

function deactivateFocusTracking() {
  document.removeEventListener('focusin', handleFocusIn)
  active = false
  focusedElement.value = undefined
}

function handleFocusIn() {
  focusedElement.value = document.activeElement as HTMLElement
}
