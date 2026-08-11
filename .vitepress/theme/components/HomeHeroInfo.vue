<script setup lang="ts">
import { computed, type Component } from 'vue'
import { useData, withBase } from 'vitepress'
import { BookOpen, CircleHelp, CirclePlay, FileText } from '@lucide/vue'
import { homeMessages, resolveUiLocaleTag } from '../../../utils/i18n'

const { lang } = useData()
const locale = computed(() => resolveUiLocaleTag(lang.value))
const messages = computed(() => homeMessages[locale.value])

const sectionIcons: Record<string, Component> = {
  playground: CirclePlay,
  why: CircleHelp,
  tutorial: BookOpen,
  reference: FileText
}
</script>

<template>
  <div class="home-hero-copy" :class="{ 'is-zh': locale === 'zh-Hans' }">
    <h1 class="home-hero-copy__title">
      <span class="home-hero-copy__title-kicker">{{ messages.titleLine1 }}</span>
      <span class="home-hero-copy__title-main">{{ messages.titleLine2 }}</span>
    </h1>

    <svg
      class="home-hero-copy__underline"
      viewBox="0 0 420 26"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M4 18C102 5 236 5 416 14" />
    </svg>

    <nav class="home-hero-links" :aria-label="messages.sectionNavLabel">
      <a
        v-for="section in messages.sections"
        :key="section.id"
        class="home-hero-links__item"
        :class="{ 'is-active': section.id === 'playground' }"
        :href="withBase(section.link)"
      >
        <span class="home-hero-links__icon" aria-hidden="true">
          <component
            :is="sectionIcons[section.icon]"
            v-if="sectionIcons[section.icon]"
            :size="26"
            :stroke-width="1.7"
          />
          <span v-else class="home-hero-links__word-icon">W</span>
        </span>
        <span>{{ section.label }}</span>
      </a>
    </nav>
  </div>
</template>

<style scoped>
.home-hero-copy {
  position: relative;
  width: min(560px, 100%);
}

.home-hero-copy__title {
  display: grid;
  margin: 0;
}

.home-hero-copy__title > span {
  display: block;
}

.home-hero-copy__title-kicker {
  color: var(--vp-c-brand-1);
  font-size: clamp(22px, 1.8vw, 28px);
  font-weight: 760;
  letter-spacing: -0.035em;
  line-height: 1.15;
}

.home-hero-copy__title-main {
  margin-top: 11px;
  color: var(--vp-c-text-1);
  font-size: clamp(78px, 6.2vw, 108px);
  font-weight: 860;
  letter-spacing: -0.075em;
  line-height: 0.92;
}

.home-hero-copy.is-zh .home-hero-copy__title-main {
  letter-spacing: -0.065em;
}

.home-hero-copy__underline {
  display: block;
  width: min(430px, 92%);
  height: 20px;
  margin: 7px 0 13px;
  overflow: visible;
}

.home-hero-copy.is-zh .home-hero-copy__underline {
  width: 250px;
}

.home-hero-copy__underline path {
  fill: none;
  stroke: var(--vp-c-brand-3);
  stroke-linecap: round;
  stroke-width: 3;
}

.home-hero-links {
  display: grid;
  width: min(clamp(320px, 33vw, 560px), 100%);
  grid-template-columns: repeat(5, minmax(56px, 1fr));
  gap: clamp(4px, 0.48vw, 8px);
}

.home-hero-links__item {
  display: grid;
  min-width: 0;
  min-height: clamp(60px, 5.5vw, 92px);
  padding: 6px 2px 5px;
  border: 1px solid transparent;
  border-radius: var(--ui-radius-sm);
  place-items: center;
  align-content: center;
  gap: 4px;
  color: var(--vp-c-text-1);
  font-size: clamp(9.5px, 0.75vw, 12px);
  font-weight: 610;
  line-height: 1.25;
  text-align: center;
  text-decoration: none;
  transition: color 150ms ease, background-color 150ms ease, border-color 150ms ease, transform 150ms ease;
}

.home-hero-links__item:hover {
  border-color: var(--vp-c-divider);
  color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-bg) 62%, transparent);
  transform: translateY(-2px);
}

.home-hero-links__item:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.home-hero-links__item.is-active {
  border-color: color-mix(in srgb, var(--vp-c-brand-soft-border) 42%, transparent);
  color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-soft) 82%, transparent);
}

.home-hero-links__icon {
  display: grid;
  width: clamp(26px, 2vw, 34px);
  height: clamp(26px, 2vw, 34px);
  place-items: center;
}

.home-hero-links__icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.home-hero-links__word-icon {
  display: grid;
  width: 25px;
  height: 29px;
  border: 1.5px solid currentColor;
  border-radius: 2px;
  place-items: center;
  font: 700 16px/1 var(--vp-font-family-base);
}

@media (max-width: 959px) {
  .home-hero-copy {
    width: min(720px, 100%);
    margin: 0 auto;
    text-align: center;
  }

  .home-hero-copy__underline {
    margin-right: auto;
    margin-left: auto;
  }

  .home-hero-links {
    margin: 0 auto;
  }
}

@media (max-width: 1180px) and (min-width: 960px) {
  .home-hero-copy {
    margin-left: 32px;
  }
}

@media (max-width: 639px) {
  .home-hero-copy__title-kicker {
    font-size: clamp(20px, 6vw, 24px);
  }

  .home-hero-copy__title-main {
    margin-top: 10px;
    font-size: clamp(70px, 22vw, 86px);
  }

  .home-hero-copy__underline {
    height: 21px;
    margin-top: 8px;
    margin-bottom: 17px;
  }

  .home-hero-links {
    width: 100%;
    padding: 2px;
    overflow-x: auto;
    grid-auto-columns: 84px;
    grid-auto-flow: column;
    grid-template-columns: none;
    justify-content: start;
    scrollbar-width: thin;
  }

  .home-hero-links__item {
    min-height: 82px;
    font-size: 11px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-hero-links__item {
    transition: none;
  }

  .home-hero-links__item:hover {
    transform: none;
  }
}
</style>
