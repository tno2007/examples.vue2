<template>
  <div class="main">
    <!-- form -->
    <div class="form">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">First name:</label>
        <input type="text" class="form-control" v-model="data.firstName" />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Last name:</label>
        <input type="text" class="form-control" v-model="data.lastName" />
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
  name: "Page1",
  components: {},
  props: {},
  setup(props, context) {
    const data = reactive({
      firstName: "Lyall",
      lastName: "van der Linde",
    });

    const completed = computed(() => {
      return (
        data.firstName.trim().length > 0 && data.lastName.trim().length > 0
      );
    });

    watch(
      () => completed.value,
      (newValue, oldValue) => {
        console.log("Page 1 changed", newValue);
        context.emit("completed-change", 0, completed.value);
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
