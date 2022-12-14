<script setup lang="ts">
import { reactive } from "vue";

const props = defineProps({
  modelProp: {
    default: () => ({}),
    type: Object,
  },
});

const data = reactive({
  model: props.modelProp,
});
</script>

<template>
  <div>
    <input type="text" name="" id="" />
  </div>
</template>
