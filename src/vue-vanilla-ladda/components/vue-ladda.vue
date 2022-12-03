<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { create, LaddaButton } from "ladda";

const emit = defineEmits(["click"]);

const refLadda = ref(null);
const ladda = ref<LaddaButton>();

//const loading = ref<boolean>(false);

const data = reactive({
  ladda: {} as LaddaButton,
});

const props = defineProps({
  // customizable button's class attribute - you can use your own CSS class
  buttonClass: {
    type: String,
    default: "ladda-button",
  },
  // use vue props validation to make sure "data-style" is given. (ladda need it)
  dataStyle: {
    type: String,
    default: "expand-left",
  },
  // loading prop to change the status of this component.
  loading: {
    type: Boolean,
    required: true,
  },
  progess: {
    validator: (progress: any) => {
      return progress >= 0 && progress <= 1;
    },
    default: 0,
  },
});

const handleClick = (e: Event) => {
  emit("click", e);
};

onMounted(() => {
  ladda.value = create(refLadda.value as any as HTMLButtonElement);
  props.loading ? ladda.value.start() : ladda.value.stop();
});

onBeforeUnmount(() => {
  ladda.value && ladda.value.remove();
  delete ladda.value;
});

watch(props, (n, o) => {
  if (n.loading) {
    ladda.value && ladda.value.start();
  } else {
    ladda.value && ladda.value.stop();
  }

  if (n.progess) {
    ladda.value && ladda.value.setProgress(props.progess);
  }
});
</script>

<template>
  <button
    ref="refLadda"
    class="btn btn-primary ladda-button"
    :data-style="dataStyle"
    @click="handleClick"
    :disabled="props.loading"
    :data-loading="props.loading"
  >
    <slot><span class="ladda-label">Submit</span></slot>
  </button>
</template>
