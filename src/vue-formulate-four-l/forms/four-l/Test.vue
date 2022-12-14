<script setup lang="ts">
defineProps({
  modelProp: {
    default: () => ({}),
    type: Object,
  },
});
</script>

<template>
  <div>
    <pre>{{ modelProp }}</pre>
  </div>
</template>
