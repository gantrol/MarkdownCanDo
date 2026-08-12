<script setup lang="ts">
import { PanelLeftClose, PanelLeftOpen } from '@lucide/vue'
import { computed, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { resolveUiLocaleTag } from '../../utils/i18n'
import HomeHeroInfo from './components/HomeHeroInfo.vue'
import HomeHeroVisual from './components/HomeHeroVisual.vue'

const route = useRoute()
const { lang } = useData()
const sidebarCollapsed = ref(false)

const isPracticePage = computed(() => (
  /^\/(?:zh\/|pt\/)?(?:tutorial|playground|showcase)\/?$/.test(route.path)
))

const sidebarLabel = computed(() => {
  const labels = {
    'en-US': { collapse: 'Collapse directory', expand: 'Expand directory' },
    'zh-Hans': { collapse: '折叠目录', expand: '展开目录' },
    'pt-BR': { collapse: 'Recolher índice', expand: 'Expandir índice' }
  }
  const current = labels[resolveUiLocaleTag(lang.value)]
  return sidebarCollapsed.value ? current.expand : current.collapse
})

watch(
  () => route.path,
  (path) => {
    sidebarCollapsed.value = /\/tutorial\/?$/.test(path)
  },
  { immediate: true }
)
</script>

<template>
  <DefaultTheme.Layout
    :class="{
      'practice-layout': isPracticePage,
      'practice-sidebar-collapsed': isPracticePage && sidebarCollapsed
    }"
  >
    <template #home-hero-info>
      <HomeHeroInfo />
    </template>
    <template #home-hero-image>
      <HomeHeroVisual />
    </template>
  </DefaultTheme.Layout>

  <button
    v-if="isPracticePage"
    type="button"
    class="practice-sidebar-toggle"
    :class="{ 'is-collapsed': sidebarCollapsed }"
    :aria-expanded="!sidebarCollapsed"
    aria-controls="VPSidebarNav"
    :aria-label="sidebarLabel"
    :title="sidebarLabel"
    @click="sidebarCollapsed = !sidebarCollapsed"
  >
    <PanelLeftOpen v-if="sidebarCollapsed" :size="18" aria-hidden="true" />
    <PanelLeftClose v-else :size="18" aria-hidden="true" />
  </button>
</template>

<style>
.practice-sidebar-toggle {
  display: none;
}

@media (min-width: 960px) {
  .practice-layout .VPSidebar,
  .practice-layout .VPContent.has-sidebar {
    transition: opacity 180ms ease, transform 180ms ease, padding-left 180ms ease;
  }

  .practice-sidebar-toggle {
    position: fixed;
    top: calc(var(--vp-nav-height) + 14px);
    left: calc(var(--vp-sidebar-width) - 20px);
    z-index: calc(var(--vp-z-index-sidebar) + 1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 10px;
    color: var(--vp-c-text-2);
    background: var(--vp-c-bg);
    box-shadow: var(--vp-shadow-2);
    cursor: pointer;
    transition: left 180ms ease, color 180ms ease, border-color 180ms ease;
  }

  .practice-sidebar-toggle:hover {
    border-color: var(--vp-c-brand-1);
    color: var(--vp-c-brand-1);
  }

  .practice-sidebar-toggle:focus-visible {
    outline: 2px solid var(--vp-c-brand-1);
    outline-offset: 2px;
  }

  .practice-sidebar-toggle.is-collapsed {
    left: 16px;
  }

  .practice-layout.practice-sidebar-collapsed .VPSidebar {
    opacity: 0;
    pointer-events: none;
    transform: translateX(-100%);
  }

  .practice-layout.practice-sidebar-collapsed .VPContent.has-sidebar {
    padding-left: 0;
  }
}

@media (min-width: 1440px) {
  .practice-sidebar-toggle {
    left: calc((100vw - (var(--vp-layout-max-width) - 64px)) / 2 + var(--vp-sidebar-width) - 52px);
  }

  .practice-sidebar-toggle.is-collapsed {
    left: 16px;
  }

  .practice-layout.practice-sidebar-collapsed .VPContent.has-sidebar {
    padding-right: 0;
    padding-left: 0;
  }
}
</style>
