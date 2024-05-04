import Vue from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";
import VueFormulate from "@braid/vue-formulate";
import autoAnimate from "@formkit/auto-animate";
import Vue2SimpleDatatable from "vue2-simple-datatable";

/*
import { install } from "@twind/core";
import config from "./twind.config";
install(config);
*/

// uses
Vue.use(PiniaVuePlugin);
Vue.use(VueFormulate);
Vue.use(Vue2SimpleDatatable);

// directives
Vue.directive("auto-animate", {
  inserted: (el, binding) => {
    autoAnimate(el, binding.value);
  },
});

// styles
import "@braid/vue-formulate/themes/snow/snow.scss";

import App from "./App.vue";

new Vue({
  pinia: createPinia(),
  render: (h) => h(App),
}).$mount("#app");
