import { defineAsyncComponent } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MermaidDiagram', defineAsyncComponent(
      () => import('./components/MermaidDiagram.vue')
    ))
  }
} satisfies Theme
