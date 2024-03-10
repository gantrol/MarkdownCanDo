<template>
  <div :id="props.id"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

const props = defineProps({
  id: {
    type: String,
    require: true,
  }
});


onMounted(() => {
  // TODO: options
  const vd = new Vditor(props.id, {
    theme: "classic",
  })
});
</script>
