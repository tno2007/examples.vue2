<script setup lang="ts">
import { ref, watch } from "vue";
import { IdUnique } from "./util";
import { FocusTrap } from "focus-trap-vue";

// using Object syntax
const props = defineProps({
  showModal: Boolean,
  modalId: String,
});

const id = IdUnique();
const active = ref(props.showModal);

watch(
  () => props.showModal,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      active.value = props.showModal;
      const body = document.querySelector("body");
      if (!body) return;
      props.showModal
        ? body.classList.add("modal-open")
        : body.classList.remove("modal-open");
    }
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <teleport to="body">
    <FocusTrap v-model:active="active">
      <div
        ref="modal"
        class="modal fade"
        :class="{ show: active, 'd-block': active }"
        tabindex="-1"
        role="dialog"
        :aria-labelledby="`modal-${id}`"
        :aria-hidden="active"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-dark" :id="`modal-${id}`">
                <slot name="title"></slot>
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="$emit('closeModal', false)"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-dark">
              <slot></slot>
            </div>
            <div class="modal-footer text-dark">
              <button
                type="button"
                class="btn btn-danger"
                @click="$emit('closeModal', true)"
              >
                Yes
              </button>
              <button
                type="button"
                class="btn btn-success"
                @click="$emit('closeModal', false)"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
    <div
      class="fade"
      :class="{ show: active, 'modal-backdrop show': active }"
    ></div>
  </teleport>
</template>
