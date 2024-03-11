<template>
  <div :id="props.id"></div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
import editorV from 'vditor';
import 'vditor/dist/index.css';

const props = defineProps({
  id: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: false,
  },
  options: {
    type: Object,
    required: false,
  },
});

const darkMode = ref(false);
const outlineElement = document.getElementById('outline')
let mdEditorV;

onMounted(() => {
  const themeToggleButton = document.querySelector("div.VPNavBarAppearance.appearance > button");

  
  darkMode.value = themeToggleButton.getAttribute("aria-checked") === "true";

  
  themeToggleButton.addEventListener('click', () => {
    darkMode.value = !darkMode.value;
  });

  mdEditorV = new editorV(props.id, {
    mode: "ir",
    height: 0.8 * window.innerHeight,
    toolbar,
    preview,
    theme: darkMode.value ? "dark": "classic",
    ...props.options,
    after() {
      mdEditorV.setValue(props.text || "");
      changeBasedOnTheme(darkMode.value);
    }
  });
});

function toggleDarkMode() {
  darkMode.value = !darkMode.value;
}

function changeBasedOnTheme(isDarkTheme) {
  if (isDarkTheme === true) {
    mdEditorV.setTheme('dark', 'dark', 'native');
    outlineElement && outlineElement.classList.add('dark')
  } else {
    outlineElement && outlineElement.classList.remove('dark')
    mdEditorV.setTheme('classic', 'light', 'github');
  }
}

watch(darkMode, (isDarkTheme) => {
  if (!mdEditorV) {
    return;
  }

  changeBasedOnTheme(isDarkTheme);
}, { immediate: true });

// ref: https://github.com/Vanessa219/vditor/blob/master/demo/index.js#L56
// TODO: mobile
const toolbar = [
  'headings',
  'bold',
  'italic',
  'strike',
  'link',
  'list',
  'ordered-list',
  'check',
  'outdent',
  'indent',
  'quote',
  'edit-mode',
  // 'upload', TODO: upload
  {
    name: 'more',
    toolbar: [
      'line',
      'code',
      'inline-code',
      'insert-before',
      'insert-after',
      'table',
      'undo',
      'redo',
      // 'content-theme',
      'preview',
      // 'code-theme',
      'export',
      'fullscreen',
      'both',
    ],
  }]

const preview = {
  markdown: {
    // toc: true,
    // mark: true,
    // footnotes: true,
    // autoSpace: true,
  },
  delay: 200,
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
/* Don't know why again */
a {
  color: #47caff;
}

</style>
