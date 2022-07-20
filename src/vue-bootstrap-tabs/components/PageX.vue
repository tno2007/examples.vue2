<template>
  <div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Just X:</label>
      <input
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/composition-api";

export default defineComponent({
  name: "PageX",
  components: {},
  props: {},
  setup(props, context) {
    const data = reactive({
      name: "Hello",
    });

    const dataRef = ref("Hello2");
    return { data, dataRef };
  },
});
</script>

<style></style>
