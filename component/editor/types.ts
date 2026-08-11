import type { Component } from 'vue'

export type EditorViewMode = 'edit' | 'wysiwyg' | 'split' | 'preview'

export interface EditorViewItem {
  mode: EditorViewMode
  label: string
  icon: Component
}

export interface EditorToolbarItem {
  key: string
  label: string
  icon: Component
  shortcut?: string
  action: () => void | Promise<void>
}

export interface EditorToolbarGroup {
  key: string
  label: string
  items: EditorToolbarItem[]
}
