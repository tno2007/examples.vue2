import {
  ref,
  onMounted,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
} from "@vue/composition-api";

export const useAppHelper = () => {
  const x = ref(0);
  const y = ref(0);

  // a composable can update its managed state over time.
  function update(event: MouseEvent) {
    x.value = event.pageX;
    y.value = event.pageY;
  }

  // a composable can also hook into its owner component's
  // lifecycle to setup and teardown side effects.
  onBeforeMount(() => {});
  onMounted(() => {
    window.addEventListener("mousemove", update);
  });
  onBeforeUpdate(() => {});
  onUpdated(() => {});
  onBeforeUnmount(() => {});
  onUnmounted(() => {
    window.removeEventListener("mousemove", update);
  });

  // expose managed state as return value
  return { x, y };
};
