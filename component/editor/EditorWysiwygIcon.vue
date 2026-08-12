<script setup lang="ts">
defineOptions({ inheritAttrs: false })
</script>

<template>
  <b class="editor-wysiwyg-icon" aria-hidden="true">W</b>
</template>

<style scoped>
.editor-wysiwyg-icon {
  display: inline-grid;
  width: 17px;
  height: 17px;
  flex: 0 0 17px;
  place-items: center;
  border: 1.4px solid currentColor;
  border-radius: 4px;
  font: 800 9px/1 var(--vp-font-family-base);
  letter-spacing: -0.08em;
}
</style>
