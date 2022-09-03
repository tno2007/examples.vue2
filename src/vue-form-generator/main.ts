import Vue from "vue";
import VueCompositionAPI, { createApp, h } from "@vue/composition-api";
import { createPinia, PiniaVuePlugin } from "pinia";

import App from "./App.vue";

Vue.use(VueCompositionAPI);

// fa icons
//import "../fa-icons";
//import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
//Vue.component("fa-icon", FontAwesomeIcon);

//import "vue-form-generator/dist/vfg.css"; // optional

import VueFormGenerator from "c:\\apps\\vue\\vue-form-generator-custom-ts\\src";
//import VueFormGenerator from "c:\\apps\\vue\\vue-form-generator-custom-ts";
Vue.use(VueFormGenerator);

const app = createApp({
  pinia: createPinia(),
  render: () => h(App),
});

app.use(PiniaVuePlugin);

//import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap";
//mport "bootstrap-icons/font/bootstrap-icons.css";

app.mount("#app");
