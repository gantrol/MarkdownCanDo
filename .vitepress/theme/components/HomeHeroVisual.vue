<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { homeMessages, resolveUiLocaleTag } from '../../../utils/i18n'
import HomeMiniPreview from './home/HomeMiniPreview.vue'
import HomeMiniSource from './home/HomeMiniSource.vue'

const { lang } = useData()
const locale = computed(() => resolveUiLocaleTag(lang.value))
const messages = computed(() => homeMessages[locale.value])
const source = ref(messages.value.example)

watch(locale, () => {
  source.value = messages.value.example
})
</script>

<template>
  <div class="home-product-visual" role="group" :aria-label="messages.demoLabel">
    <div class="home-product-visual__chrome">
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <strong>{{ messages.fileName }}</strong>
    </div>

    <div class="home-product-visual__workspace">
      <HomeMiniSource
        v-model="source"
        :label="messages.source"
        :aria-label="messages.sourceAriaLabel"
      />
      <HomeMiniPreview
        :source="source"
        :locale="locale"
        :label="messages.preview"
      />
    </div>

    <footer>
      <span v-for="format in messages.formats" :key="format">{{ format }}</span>
    </footer>
  </div>
</template>

<style>
.home-product-visual {
  width: min(560px, 100%);
  overflow: hidden;
  border: 1px solid var(--vp-c-border);
  border-radius: var(--ui-radius-window);
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  box-shadow: 0 24px 70px rgb(0 0 0 / 10%), 0 2px 8px rgb(0 0 0 / 5%);
}

.dark .home-product-visual {
  box-shadow: 0 30px 80px rgb(0 0 0 / 38%), 0 0 0 1px rgb(255 255 255 / 3%);
}

.home-product-visual__chrome {
  display: flex;
  height: 44px;
  padding: 0 16px;
  align-items: center;
  gap: 7px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.home-product-visual__chrome > span {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--vp-c-border);
}

.home-product-visual__chrome > span:first-child {
  background: var(--vp-c-brand-3);
}

.home-product-visual__chrome strong {
  margin-left: 8px;
  color: var(--vp-c-text-2);
  font: 600 11px/1 var(--vp-font-family-mono);
}

.home-product-visual__workspace {
  display: grid;
  min-height: 318px;
  grid-template-columns: 0.96fr 1.04fr;
}

.home-product-visual__source,
.home-product-visual__preview {
  display: flex;
  min-width: 0;
  min-height: 0;
  padding: 15px 17px 18px;
  flex-direction: column;
}

.home-product-visual__source {
  border-right: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
}

.home-product-visual__pane-label {
  display: block;
  margin-bottom: 12px;
  color: var(--vp-c-text-3);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.home-product-visual__source textarea {
  width: 100%;
  min-height: 0;
  padding: 0;
  resize: none;
  flex: 1;
  border: 0;
  outline: 0;
  color: var(--vp-c-text-2);
  background: transparent;
  caret-color: var(--vp-c-brand-1);
  font: 10.5px/1.7 var(--vp-font-family-mono);
  scrollbar-width: thin;
}

.home-product-visual__source textarea:focus-visible {
  border-radius: var(--ui-radius-xs);
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 5px;
}

.home-product-visual__preview-content {
  min-height: 0;
  overflow: auto;
  flex: 1;
  scrollbar-width: thin;
}

.home-product-visual__preview-content > :first-child {
  margin-top: 0;
}

.home-product-visual__preview-content h1 {
  padding: 0;
  margin: 0 0 7px;
  border: 0;
  font-size: 19px;
  line-height: 1.25;
  letter-spacing: -0.03em;
}

.home-product-visual__preview-content p,
.home-product-visual__preview-content li {
  color: var(--vp-c-text-2);
  font-size: 10.5px;
  line-height: 1.55;
}

.home-product-visual__preview-content p {
  margin: 0 0 9px;
}

.home-product-visual__preview-content ul {
  padding: 0;
  margin: 0 0 10px;
  list-style: none;
}

.home-product-visual__preview-content .task-list-item {
  display: flex;
  padding: 3px 0;
  align-items: center;
  gap: 7px;
}

.home-product-visual__preview-content .task-list-item-checkbox {
  width: 14px;
  height: 14px;
  margin: 0;
  accent-color: var(--vp-c-brand-3);
}

.home-product-visual__preview-content .md-preview-diagram {
  min-height: 88px;
  padding: 8px;
  margin: 10px 0 0;
  overflow: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--ui-radius-md);
  background: var(--vp-c-bg-soft);
}

.home-product-visual__preview-content .md-preview-diagram__canvas svg {
  display: block;
  width: 100%;
  max-width: 100%;
  max-height: 104px;
  margin: auto;
}

.home-product-visual__preview-content .md-preview-diagram__status {
  display: grid;
  min-height: 72px;
  margin: 0;
  place-items: center;
  color: var(--vp-c-text-3);
  font-size: 10px;
  text-align: center;
}

.home-product-visual__preview-content .md-preview-diagram__status[hidden] {
  display: none;
}

.home-product-visual__preview-content .md-preview-diagram__source {
  display: none;
}

.home-product-visual footer {
  display: flex;
  min-height: 40px;
  padding: 0 16px;
  align-items: center;
  gap: 7px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.home-product-visual footer span {
  padding: 4px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg);
  font: 600 9px/1 var(--vp-font-family-mono);
}

@media (max-width: 520px) {
  .home-product-visual__workspace {
    min-height: 470px;
    grid-template-columns: 1fr;
    grid-template-rows: 220px 250px;
  }

  .home-product-visual__source {
    border-right: 0;
    border-bottom: 1px solid var(--vp-c-divider);
  }
}
</style>
