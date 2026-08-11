<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import HomeHeroVisual from './components/HomeHeroVisual.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-hero-image>
      <HomeHeroVisual />
    </template>
  </DefaultTheme.Layout>
</template>
