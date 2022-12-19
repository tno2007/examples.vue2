<script lang="ts">
import { defineComponent, h, PropType, reactive } from "vue";

export default defineComponent({
  props: {
    component: {
      type: String as PropType<String>,
      required: true,
      default: () => "div",
    },
    children: {
      type: String as PropType<String>,
      required: false,
      default: () => "",
    },
  },
  setup(props, context) {
    const data = reactive({
      component: props.component,
      children: props.children,
    });

    return () => h("div", "abcdef");
  },
});
</script>
