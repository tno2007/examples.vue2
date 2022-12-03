import Vue from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";

import App from "./App.vue";

//import VueFormulate from "@braid/vue-formulate";
//import "@braid/vue-formulate/themes/snow/snow.scss";

//import YearMonthDayFormulateInput from "./components/common/vf/custom/src/inputs/YearMonthDayFormulateInput.vue";
//Vue.component("YearMonthDayFormulateInput", YearMonthDayFormulateInput);

Vue.use(PiniaVuePlugin);

import VueTransitions from "@morev/vue-transitions";
import "@morev/vue-transitions/styles";
Vue.use(VueTransitions);

// fa icons
import "../fa-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.component("fa-icon", FontAwesomeIcon);

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
Vue.use(Toast);

new Vue({
  pinia: createPinia(),
  render: (h) => h(App),
}).$mount("#app");
