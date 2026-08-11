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
  <div class="home-workbench-stage" role="group" :aria-label="messages.demoLabel">
    <svg
      class="home-workbench-ribbon"
      viewBox="0 0 920 470"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        class="home-workbench-ribbon__ink"
        d="M54 190C150 276 252 366 348 410C387 428 420 411 450 371C552 236 666 133 806 39"
      />
    </svg>
    <svg
      class="home-workbench-slash"
      viewBox="0 0 320 280"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M28 252C104 177 188 94 294 22" />
    </svg>
    <div class="home-workbench-stage__paper home-workbench-stage__paper--back" aria-hidden="true" />
    <div class="home-workbench-stage__paper home-workbench-stage__paper--middle" aria-hidden="true" />
    <div class="home-workbench-stage__holes" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <i />
    </div>

    <div class="home-product-visual">
      <div class="home-product-visual__chrome">
        <span class="home-product-visual__traffic" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
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

    <div class="home-workbench-fragment home-workbench-fragment--selection" aria-hidden="true">
      <svg viewBox="0 0 112 92">
        <rect class="home-selection__surface" x="14" y="13" width="84" height="64" />
        <path class="home-selection__caret" d="M46 29H66M56 29V61M46 61H66" />
        <g class="home-selection__handles">
          <rect x="10" y="9" width="8" height="8" />
          <rect x="52" y="9" width="8" height="8" />
          <rect x="94" y="9" width="8" height="8" />
          <rect x="10" y="41" width="8" height="8" />
          <rect x="94" y="41" width="8" height="8" />
          <rect x="10" y="73" width="8" height="8" />
          <rect x="52" y="73" width="8" height="8" />
          <rect x="94" y="73" width="8" height="8" />
        </g>
      </svg>
    </div>

    <div class="home-workbench-fragment home-workbench-fragment--flow" aria-hidden="true">
      <span />
      <i />
      <span />
      <i />
      <span />
    </div>

    <div class="home-workbench-fragment home-workbench-fragment--checklist" aria-hidden="true">
      <span class="is-checked"><i /></span>
      <span class="is-checked"><i /></span>
      <span><i /></span>
    </div>
  </div>
</template>

<style>
.home-workbench-stage {
  position: relative;
  isolation: isolate;
  width: min(900px, 100%);
  padding: 48px 8px 98px 56px;
}

.home-workbench-ribbon {
  position: absolute;
  z-index: -3;
  bottom: -9px;
  left: -210px;
  width: clamp(420px, 30vw, 560px);
  height: clamp(240px, 17vw, 300px);
  overflow: visible;
  pointer-events: none;
}

.home-workbench-ribbon__ink {
  fill: none;
  stroke: color-mix(in srgb, var(--vp-c-brand-3) 21%, transparent);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 72px;
}

.home-workbench-slash {
  position: absolute;
  z-index: -3;
  top: -90px;
  right: -130px;
  width: clamp(220px, 19vw, 320px);
  height: clamp(190px, 16.5vw, 280px);
  overflow: visible;
  pointer-events: none;
}

.home-workbench-slash path {
  fill: none;
  stroke: color-mix(in srgb, var(--vp-c-brand-3) 17%, transparent);
  stroke-linecap: round;
  stroke-width: 54px;
}

.home-workbench-stage__paper {
  position: absolute;
  z-index: -2;
  inset: 26px 18px 84px 14px;
  border: 1px solid color-mix(in srgb, var(--vp-c-border) 56%, transparent);
  border-radius: 6px;
  background:
    url('/paper-grain.svg') repeat,
    linear-gradient(
      145deg,
      color-mix(in srgb, var(--vp-c-bg) 98%, white) 0%,
      color-mix(in srgb, var(--vp-c-bg) 88%, var(--vp-c-bg-soft)) 100%
    );
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 72%),
    0 24px 58px rgb(0 0 0 / 10%);
}

.home-workbench-stage__paper--back {
  transform: rotate(3.1deg) translate(32px, -16px);
}

.home-workbench-stage__paper--middle {
  z-index: -1;
  transform: rotate(-2.1deg) translate(-2px, 20px);
}

.home-workbench-stage__holes {
  position: absolute;
  z-index: 1;
  top: 142px;
  left: 25px;
  display: grid;
  gap: 26px;
  pointer-events: none;
  transform: rotate(-2.1deg);
}

.home-workbench-stage__holes i {
  display: block;
  width: 18px;
  height: 18px;
  border: 1px solid color-mix(in srgb, var(--vp-c-border) 54%, transparent);
  border-radius: 50%;
  background: color-mix(in srgb, var(--vp-c-bg-mute) 74%, transparent);
  box-shadow:
    inset 1px 2px 3px rgb(0 0 0 / 12%),
    0 1px 0 rgb(255 255 255 / 80%);
}

.home-product-visual {
  position: relative;
  z-index: 3;
  width: 100%;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--vp-c-border) 82%, transparent);
  border-radius: var(--ui-radius-window);
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  box-shadow:
    0 1px 2px rgb(0 0 0 / 5%),
    0 32px 76px rgb(0 0 0 / 17%);
  transform: rotate(0.18deg);
}

.home-product-visual::after {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 75%);
  content: '';
  pointer-events: none;
}

.dark .home-product-visual {
  box-shadow: 0 30px 80px rgb(0 0 0 / 38%), 0 0 0 1px rgb(255 255 255 / 3%);
}

.home-product-visual__chrome {
  display: flex;
  height: 54px;
  padding: 0 17px;
  align-items: center;
  gap: 9px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.home-product-visual__traffic {
  display: flex;
  align-items: center;
  gap: 6px;
}

.home-product-visual__traffic i {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--vp-c-border);
}

.home-product-visual__traffic i:first-child {
  background: var(--vp-c-brand-3);
}

.home-product-visual__chrome strong {
  color: var(--vp-c-text-2);
  font: 650 12px/1 var(--vp-font-family-mono);
}

.home-product-visual__workspace {
  display: grid;
  height: clamp(280px, calc(100svh - 440px), 500px);
  min-height: 0;
  grid-template-columns: 0.96fr 1.04fr;
}

.home-product-visual__source,
.home-product-visual__preview {
  display: flex;
  min-width: 0;
  min-height: 0;
  padding: 21px 23px 24px;
  flex-direction: column;
}

.home-product-visual__source {
  border-right: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
}

.home-product-visual__pane-label {
  display: block;
  margin-bottom: 17px;
  color: var(--vp-c-text-3);
  font-size: 11px;
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
  color: color-mix(in srgb, var(--vp-c-text-1) 82%, var(--vp-c-text-2));
  background: transparent;
  caret-color: var(--vp-c-brand-1);
  font: clamp(11.5px, 0.78vw, 13px)/1.72 var(--vp-font-family-mono);
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
  margin: 0 0 10px;
  border: 0;
  font-size: 24px;
  line-height: 1.25;
  letter-spacing: -0.03em;
}

.home-product-visual__preview-content p,
.home-product-visual__preview-content li {
  color: var(--vp-c-text-2);
  font-size: clamp(11.5px, 0.76vw, 12.5px);
  line-height: 1.62;
}

.home-product-visual__preview-content p {
  margin: 0 0 12px;
}

.home-product-visual__preview-content ul {
  padding: 0;
  margin: 0 0 14px;
  list-style: none;
}

.home-product-visual__preview-content .task-list-item {
  display: flex;
  padding: 4px 0;
  align-items: center;
  gap: 7px;
}

.home-product-visual__preview-content .task-list-item-checkbox {
  width: 15px;
  height: 15px;
  margin: 0;
  accent-color: var(--vp-c-brand-3);
}

.home-product-visual__preview-content .md-preview-diagram {
  min-height: 128px;
  padding: 12px;
  margin: 16px 0 0;
  overflow: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--ui-radius-md);
  background: var(--vp-c-bg-soft);
}

.home-product-visual__preview-content .md-preview-diagram__canvas svg {
  display: block;
  width: 100%;
  max-width: 100%;
  max-height: 142px;
  margin: auto;
}

.home-product-visual__preview-content .md-preview-diagram__status {
  display: grid;
  min-height: 104px;
  margin: 0;
  place-items: center;
  color: var(--vp-c-text-3);
  font-size: 0;
  text-align: center;
}

.home-product-visual__preview-content .md-preview-diagram__status::after {
  width: 14px;
  height: 14px;
  border: 2px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand-3);
  border-radius: 50%;
  animation: home-diagram-spin 700ms linear infinite;
  content: '';
}

.home-product-visual__preview-content .md-preview-diagram[data-state='error'] .md-preview-diagram__status {
  font-size: 10px;
}

.home-product-visual__preview-content .md-preview-diagram[data-state='error'] .md-preview-diagram__status::after {
  display: none;
}

.home-product-visual__preview-content .md-preview-diagram__status[hidden] {
  display: none;
}

.home-product-visual__preview-content .md-preview-diagram__source {
  display: none;
}

.home-product-visual footer {
  display: flex;
  min-height: 44px;
  padding: 0 18px;
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
  font: 600 10px/1 var(--vp-font-family-mono);
}

.home-product-visual footer span:first-child {
  border-color: var(--vp-c-brand-soft-border);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.home-workbench-fragment {
  position: absolute;
  z-index: 4;
  border: 1px solid color-mix(in srgb, var(--vp-c-border) 74%, transparent);
  border-radius: 5px;
  background:
    url('/paper-grain.svg') repeat,
    color-mix(in srgb, var(--vp-c-bg) 97%, transparent);
  box-shadow: 0 15px 34px rgb(0 0 0 / 13%);
  pointer-events: none;
}

.home-workbench-fragment--selection {
  bottom: 35px;
  left: clamp(-520px, -30.5vw, -300px);
  display: block;
  width: clamp(88px, 6.7vw, 112px);
  height: clamp(72px, 5.5vw, 92px);
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  clip-path: none;
  transform: rotate(-5deg);
}

.home-workbench-fragment--selection svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.home-selection__surface {
  fill: color-mix(in srgb, var(--vp-c-bg) 56%, transparent);
  stroke: color-mix(in srgb, var(--vp-c-text-2) 76%, transparent);
  stroke-dasharray: 5 4;
  stroke-width: 1.4px;
}

.home-selection__caret {
  fill: none;
  stroke: var(--vp-c-text-1);
  stroke-linecap: square;
  stroke-width: 2.6px;
}

.home-selection__handles rect {
  fill: var(--vp-c-bg);
  stroke: color-mix(in srgb, var(--vp-c-text-2) 82%, transparent);
  stroke-width: 1.2px;
}

.home-workbench-fragment--flow {
  right: clamp(266px, 22.7vw, 380px);
  bottom: -20px;
  display: flex;
  width: clamp(198px, 17vw, 280px);
  height: clamp(56px, 4vw, 64px);
  padding: 0 clamp(12px, 1.1vw, 18px);
  align-items: center;
  justify-content: center;
  transform: rotate(-2.4deg);
}

.home-workbench-fragment--flow span {
  width: clamp(40px, 3vw, 50px);
  height: clamp(26px, 1.9vw, 32px);
  border: 1px solid var(--vp-c-brand-soft-border);
  border-radius: var(--ui-radius-xs);
  background: var(--vp-c-brand-soft);
}

.home-workbench-fragment--flow i {
  position: relative;
  width: clamp(24px, 1.85vw, 31px);
  height: 1px;
  background: var(--vp-c-text-3);
}

.home-workbench-fragment--flow i::after {
  position: absolute;
  top: -3px;
  right: -1px;
  width: 6px;
  height: 6px;
  border-top: 1px solid var(--vp-c-text-3);
  border-right: 1px solid var(--vp-c-text-3);
  content: '';
  transform: rotate(45deg);
}

.home-workbench-fragment--checklist {
  right: 80px;
  bottom: -20px;
  display: grid;
  width: 132px;
  min-height: 142px;
  padding: 25px 20px;
  align-content: center;
  gap: 17px;
  clip-path: polygon(4% 1%, 97% 4%, 100% 96%, 2% 100%, 0 12%);
  transform: rotate(4.5deg);
}

.home-workbench-fragment--checklist > span {
  position: relative;
  display: block;
  height: 1px;
  margin-left: 30px;
  background: var(--vp-c-text-3);
}

.home-workbench-fragment--checklist > span::before {
  position: absolute;
  top: -8px;
  left: -30px;
  width: 15px;
  height: 15px;
  border: 1px solid var(--vp-c-border);
  border-radius: 3px;
  content: '';
}

.home-workbench-fragment--checklist > span.is-checked::before {
  border-color: var(--vp-c-brand-3);
  background: var(--vp-c-brand-soft);
}

.home-workbench-fragment--checklist > span.is-checked i::before,
.home-workbench-fragment--checklist > span.is-checked i::after {
  position: absolute;
  z-index: 1;
  height: 1.5px;
  background: var(--vp-c-brand-1);
  content: '';
}

.home-workbench-fragment--checklist > span.is-checked i::before {
  top: -1px;
  left: -27px;
  width: 5px;
  transform: rotate(45deg);
}

.home-workbench-fragment--checklist > span.is-checked i::after {
  top: -3px;
  left: -24px;
  width: 9px;
  transform: rotate(-48deg);
}

@supports (corner-shape: superellipse(2)) {
  .home-workbench-stage__paper,
  .home-workbench-fragment,
  .home-workbench-fragment--flow span {
    corner-shape: var(--ui-corner-curve);
  }
}

@media (max-width: 1180px) {
  .home-workbench-fragment--checklist {
    right: 20px;
  }
}

@media (max-width: 520px) {
  .home-workbench-stage {
    padding: 24px 2px 62px;
  }

  .home-workbench-stage__paper {
    inset: 30px 8px 72px;
  }

  .home-workbench-ribbon {
    bottom: -8px;
    left: -230px;
    opacity: 0.62;
    transform: scale(0.72);
    transform-origin: left bottom;
  }

  .home-workbench-fragment--selection,
  .home-workbench-fragment--checklist,
  .home-workbench-stage__holes,
  .home-workbench-slash {
    display: none;
  }

  .home-product-visual {
    transform: none;
  }

  .home-product-visual__workspace {
    height: 500px;
    min-height: 500px;
    grid-template-columns: 1fr;
    grid-template-rows: 238px 262px;
  }

  .home-product-visual__source {
    border-right: 0;
    border-bottom: 1px solid var(--vp-c-divider);
  }

  .home-workbench-fragment--flow {
    right: 50%;
    bottom: 2px;
    width: min(240px, 78vw);
    transform: translateX(50%) rotate(-1deg);
  }
}

@keyframes home-diagram-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-product-visual__preview-content .md-preview-diagram__status::after {
    animation: none;
  }
}
</style>
