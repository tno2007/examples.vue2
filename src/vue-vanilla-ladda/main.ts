import Vue from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";

import App from "./App.vue";

Vue.use(PiniaVuePlugin);

import VueTransitions from "@morev/vue-transitions";
import "@morev/vue-transitions/styles";
Vue.use(VueTransitions);

// fa icons
import "../fa-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.component("fa-icon", FontAwesomeIcon);

import "./scss/app.scss";

new Vue({
  pinia: createPinia(),
  render: (h) => h(App),
}).$mount("#app");
