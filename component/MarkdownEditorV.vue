<template>
  <div :id="props.id"></div>
</template>

<script setup>
import {onMounted} from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

const props = defineProps({
  id: {
    type: String,
    require: true,
  },
  mode: {
    type: "wysiwyg" | "sv" | "ir",
    require: false,
  },
  text: {
    type: String,
    require: false,
  },
  height: {
    type: Number,
    require: false,
  },
});

onMounted(() => {
  // TODO: options
  const mdEditorV = new Vditor(props.id, {
    mode: props.mode || "sv",
    theme: "classic",
    height: props.height || 0.8 * window.innerHeight || 600,
    toolbar,
    preview,
    after() {
      mdEditorV.setValue(props.text || "");
    }
  });
});

// ref: https://github.com/Vanessa219/vditor/blob/master/demo/index.js#L56
const toolbar = [
  'emoji',
  'headings',
  'bold',
  'italic',
  'strike',
  'link',
  '|',
  'list',
  'ordered-list',
  'check',
  'outdent',
  'indent',
  '|',
  'quote',
  'line',
  'code',
  'inline-code',
  'insert-before',
  'insert-after',
  '|',
  // 'upload', TODO: upload
  'table',
  '|',
  'undo',
  'redo',
  '|',
  'edit-mode',
  // 'content-theme',
  'preview',
  // 'code-theme',
  'export',
  {
    name: 'more',
    toolbar: [
      'fullscreen',
      'both',
    ],
  }]

const preview = {
  markdown: {
    toc: true,
    mark: true,
    footnotes: true,
    autoSpace: true,
  },
  math: {
    engine: 'KaTeX',
    inlineDigit: true,
  },
}


</script>

<style>
/* Don't know why number disappeared */
.vditor-reset ol {
  list-style: number;
}

</style>