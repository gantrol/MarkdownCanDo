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
    theme: darkMode.value ? "dark": "classic",
    ...props.options,
    after() {
      mdEditorV.setValue(props.text || "");
    }
  });

  if (darkMode.value) {
    importDarkThemeCSS();
  }
});


function importDarkThemeCSS() {
  import('vditor/dist/css/content-theme/dark.css').then(() => {
    console.log('Dark theme CSS loaded');
    if (mdEditorV) mdEditorV.setTheme('dark', 'dark');
  }).catch(err => {
    console.error('Failed to load dark theme CSS', err);
  });
}


watch(darkMode, (newValue) => {
  if (!mdEditorV) {
    return;
  }

  if (newValue === true) {
    importDarkThemeCSS();
  } else {
    mdEditorV.setTheme('classic', 'classic');

    const darkThemeStyle = document.querySelector('style[data-vite-dev-id*="content-theme/dark.css"]');
    if (darkThemeStyle) {
      darkThemeStyle.remove();
    }
  }
}, { immediate: true });

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
