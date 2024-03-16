<template>
  <div :id="props.id"></div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref, watch} from 'vue';
import editorV from 'vditor';
import 'vditor/dist/index.css';
import {isLargeWindow} from "../utils/screen_utils";

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
    default: {},
    required: false,
  },
});

const darkMode = ref(false);
let outlineElement;
let themeToggleButton;
let mdEditorV;

const changeDarkMode = () => {
    darkMode.value = !darkMode.value;
}

const isLargeWindowHandler = (isLarge) => {
  // TODO: 目前无法修改
  if (!mdEditorV) {
    return;
  }

  debugger;
  if (!props.options?.mode) {
    if (isLarge) {
      // mdEditorV.setDisplayMode("sv");
    } else {
      // mdEditorV.setDisplayMode("ir");
    }
  }
  if (!props.options?.width) {
    if (isLarge) {
      // mdEditorV.setWidth(window.innerWidth);
    } else {
      // mdEditorV.setWidth(0.6 * window.innerWidth);
    }
  }

}

onMounted(() => {
  // TODO: 移动端夜间模式不对
  // TODO: 夜间模式第一次切换成light，编辑器不会切换主题
  themeToggleButton = document.querySelector("div.VPNavBarAppearance.appearance > button");
  outlineElement = document.getElementById('outline');
  darkMode.value = themeToggleButton.getAttribute("aria-checked") === "true";


  mdEditorV = new editorV(props.id, {
    mode: isLargeWindow() ? "sv": "ir",
    height: 0.92 * window.innerHeight,
    width: isLargeWindow() ? 0.75 * window.innerWidth : 0.98 * window.innerWidth,
    toolbar,
    preview,
    theme: darkMode.value ? "dark": "classic",
    ...props.options,
    after() {
      mdEditorV.setValue(props.text || "");
      changeBasedOnTheme(darkMode.value);
    }
  });
  themeToggleButton.addEventListener('click', changeDarkMode);

  window.addEventListener('resize', isLargeWindowHandler);
});


onBeforeUnmount(() => {
  themeToggleButton.removeEventListener('click', changeDarkMode);
  window.removeEventListener('resize', isLargeWindowHandler);
})

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

watch(() => props.text, (newText) => {
  if (!mdEditorV) {
    return;
  }

  mdEditorV.setValue(newText);
}, { immediate: true })

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
  'preview',
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
      'content-theme',
      'code-theme',
      'export',
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
.vditor-preview a {
  color: #31b8ee !important;
  font-weight: bold;
}

</style>
