import Vue from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";

import App from "./App.vue";

import VueFormulate from "@braid/vue-formulate";
import "@braid/vue-formulate/themes/snow/snow.scss";

import YearMonthDayFormulateInput from "./components/common/vf/custom/src/inputs/YearMonthDayFormulateInput.vue";
Vue.component("YearMonthDayFormulateInput", YearMonthDayFormulateInput);

import CustomGroupFormulateInput from "./components/common/vf/custom/src/inputs/CustomGroupFormulateInput.vue";
Vue.component("CustomGroupFormulateInput", CustomGroupFormulateInput);

Vue.use(PiniaVuePlugin);

Vue.use(VueFormulate, {
  locales: {
    en: {
      required({ name }: any) {
        return `We need this information to assist you.`;
      },
    },
  },
  library: {
    //customgroup: {
    //  classification: "customgroup",
    //  component: "CustomGroupFormulateInput",
    //},
    yearmonthday: {
      classification: "select",
      component: "YearMonthDayFormulateInput",
      slotProps: {
        component: ["format"],
      },
    },
    customgroup: {
      classification: "box",
      component: "CustomGroupFormulateInput",
      slotProps: {
        component: ["groupChildren"],
      },
    },
  },
});

import VueTransitions from "@morev/vue-transitions";
import "@morev/vue-transitions/styles";
Vue.use(VueTransitions);

// fa icons
import "../fa-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.component("fa-icon", FontAwesomeIcon);

import "vue-step-progress/dist/main.css";

new Vue({
  pinia: createPinia(),
  render: (h) => h(App),
}).$mount("#app");
