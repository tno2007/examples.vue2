<template>
  <div class="main">
    <div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Father:</label>
        <input type="text" class="form-control" v-model="data.father" />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Mother:</label>
        <input type="text" class="form-control" v-model="data.mother" />
      </div>
    </div>
    <!-- vars -->
    <pre>{{ completed }}</pre>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  watch,
} from "@vue/composition-api";

export default defineComponent({
  name: "Page3",
  components: {},
  props: {},
  setup(props, context) {
    const data = reactive({
      mother: "Linette",
      father: "Lennox",
    });

    const completed = computed(() => {
      return data.mother.trim().length > 0 && data.father.trim().length > 0;
    });

    watch(
      () => completed.value,
      (newValue, oldValue) => {
        console.log("Page 3 changed", newValue);
        context.emit("on-completed-change", 2, completed.value);
      }
    );

    return { data, completed };
  },
});
</script>

<style></style>
