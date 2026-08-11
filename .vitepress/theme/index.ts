import { defineAsyncComponent } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ThemeLayout from './ThemeLayout.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: ThemeLayout,
  enhanceApp({ app }) {
    app.component('AbcNotation', defineAsyncComponent(
      () => import('./components/AbcNotation.vue')
    ))
    app.component('MermaidDiagram', defineAsyncComponent(
      () => import('./components/MermaidDiagram.vue')
    ))
  }
} satisfies Theme
