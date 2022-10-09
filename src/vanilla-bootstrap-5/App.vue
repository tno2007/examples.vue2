<script setup lang="ts">
import { reactive, ref } from "vue";
import Modal from "./components/bs/Modal.vue";

const data = reactive({
  showModal: false,
});

const handleClearLocalstorage = () => {
  localStorage.clear();
  location.reload();
  return false;
};

const handleCloseModal = (n: any) => {
  console.log("n", n);

  data.showModal = false;
  if (n) {
    handleClearLocalstorage();
  }
};
</script>

<template>
  <div id="app">
    <Modal :showModal="data.showModal" @closeModal="handleCloseModal">
      <template v-slot:title>Warning</template>
      <p>Do you really wish to clear your cart</p>
    </Modal>
    <button href="#" @click="data.showModal = !data.showModal">Hello</button>
    <pre>{{ data }}</pre>
  </div>
</template>

<style lang="scss">
@import "@/../scss/app.scss";
</style>
