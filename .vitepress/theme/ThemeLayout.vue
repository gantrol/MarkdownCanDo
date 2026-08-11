<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import HomeHeroInfo from './components/HomeHeroInfo.vue'
import HomeHeroVisual from './components/HomeHeroVisual.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-hero-info>
      <HomeHeroInfo />
    </template>
    <template #home-hero-image>
      <HomeHeroVisual />
    </template>
  </DefaultTheme.Layout>
</template>
