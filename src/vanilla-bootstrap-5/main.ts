import Vue from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";
import App from "./App.vue";

// fa icons
import "../fa-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.component("fa-icon", FontAwesomeIcon);

import "vue-step-progress/dist/main.css";

Vue.use(PiniaVuePlugin);

const i = 2009;
let yearPadded = i.toString().padStart(4, "0");

new Vue({
  pinia: createPinia(),
  render: (h) => h(App),
}).$mount("#app");
