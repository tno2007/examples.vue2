<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

import VueLadda from "./vue-ladda.vue";

const data = reactive({
  loading: false,
});

const t = () => {
  data.loading = !data.loading;
};
</script>

<template>
  <div>
    <VueLadda
      :loading="data.loading"
      class="btn btn-primary"
      :progess="0.1"
      type="submit"
      @click="t"
      >Submit CMP
    </VueLadda>

    <p>&nbsp;</p>

    <pre>{{ data.loading }}</pre>
    <button @click="t">Click me</button>

    <p>&nbsp;</p>
    <!--     -->
  </div>
</template>
