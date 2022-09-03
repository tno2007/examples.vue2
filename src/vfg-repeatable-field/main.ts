import Vue from "vue";
import VueCompositionAPI, { createApp, h } from "@vue/composition-api";
import { createPinia, PiniaVuePlugin } from "pinia";

import VueFormGenerator from "vue-form-generator";

import fieldArray from "./common/components/vfg-custom-fields/field-array.vue";
Vue.component("fieldArray", fieldArray);

import App from "./App.vue";

Vue.use(VueCompositionAPI);

const app = createApp({
  pinia: createPinia(),
  render: () => h(App),
});
app.use(PiniaVuePlugin);
app.use(VueFormGenerator);

// global css
import "vue-form-generator/dist/vfg.css";

app.mount("#app");
