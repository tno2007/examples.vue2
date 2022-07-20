import Vue from "vue";
import VueCompositionAPI, { createApp, h } from "@vue/composition-api";
import { createPinia, PiniaVuePlugin } from "pinia";

import App from "./App.vue";

Vue.use(VueCompositionAPI);

// fa icons
import "../fa-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.component("fa-icon", FontAwesomeIcon);

const app = createApp({
  pinia: createPinia(),
  render: () => h(App),
});
app.use(PiniaVuePlugin);

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

app.mount("#app");
