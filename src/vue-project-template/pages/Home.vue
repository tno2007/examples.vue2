<style lang="scss"></style>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  computed,
} from "@vue/composition-api";
import sampleData from "../common/data/sampleDataSet";
import { useAppHelper } from "../common/composables/useAppHelper";
export default defineComponent({
  name: "Home",
  components: {},
  props: {
    sampleProp: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    const data = reactive({});

    const people = computed(() => {
      return sampleData;
    });

    const { x, y } = useAppHelper();

    onMounted(() => {});

    return {
      data,
      people,
      x,
      y,
    };
  },
});
</script>

<template>
  <div>
    <ul>
      <li v-for="p in people">{{ p.firstName }} {{ p.lastName }}</li>
    </ul>
    <div>mouse position is: {{ x }}, {{ y }}</div>
  </div>
</template>
