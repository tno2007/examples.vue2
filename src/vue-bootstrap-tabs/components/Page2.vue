<template>
  <div class="main">
    <div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Age:</label>
        <input type="text" class="form-control" v-model="data.age" />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label"
          >Years employed:</label
        >
        <input type="text" class="form-control" v-model="data.yearsEmployed" />
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
  name: "Page2",
  components: {},
  props: {},
  setup(props, context) {
    const data = reactive({
      age: 35,
      yearsEmployed: 16,
    });

    const completed = computed(() => {
      return (
        data.age.toString().trim().length > 0 &&
        data.yearsEmployed.toString().trim().length > 0
      );
    });

    watch(
      () => completed.value,
      (newValue, oldValue) => {
        console.log("Page 2 changed", newValue);
        context.emit("on-completed-change", 1, completed.value);
      }
    );

    return {
      data,
      completed,
    };
  },
});
</script>

<style></style>
