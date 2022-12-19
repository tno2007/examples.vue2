<script lang="ts">
import { divide } from "lodash";
import { defineComponent, h, PropType, reactive } from "vue";
//import {  IVueFormulate } from "@braid/vue-formulate";

export default defineComponent({
  props: {},
  setup(props, context) {
    const data = reactive({});

    return () => h("div", "dddd");
    h("FormulateInput", [
      h("h5", "Hello"),
      h("div", { attrs: { id: "sss" } }, "hello"),
    ]);
  },
});
</script>
