<script setup lang="ts">
withDefaults(defineProps<{
  size?: 'small' | 'large'
}>(), {
  size: 'small'
})
</script>

<template>
  <span class="brand-mark" :class="`brand-mark--${size}`" aria-hidden="true">
    <img src="/logo-mini.png" alt="" width="56" height="56" />
  </span>
</template>

<style scoped>
.brand-mark {
  display: inline-grid;
  flex: none;
  place-items: center;
  background: transparent;
}

.brand-mark img {
  display: block;
  width: auto;
  height: auto;
}

.brand-mark--small {
  width: 22px;
  height: 22px;
}

.brand-mark--small img {
  width: 22px;
  height: 22px;
}

.brand-mark--large {
  width: 52px;
  height: 52px;
}

.brand-mark--large img {
  width: 52px;
  height: 52px;
}
</style>
