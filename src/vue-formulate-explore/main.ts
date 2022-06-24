import Vue from "vue";
import VueCompositionAPI, { createApp, h } from "@vue/composition-api";
import { createPinia, PiniaVuePlugin } from "pinia";

import App from "./App.vue";

Vue.use(VueCompositionAPI);

import VueFormulate from "@braid/vue-formulate";
import "@braid/vue-formulate/themes/snow/snow.scss";

import YearMonthDayFormulateInput from "./components/common/vf/custom/src/inputs/YearMonthDayFormulateInput.vue";
Vue.component("YearMonthDayFormulateInput", YearMonthDayFormulateInput);

//import CustomGroupFormulateInput from "./components/common/vf/custom/src/inputs/FormulateInputGroup.vue";
//Vue.component("CustomGroupFormulateInput", CustomGroupFormulateInput);

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
  },
});

const app = createApp({
  pinia: createPinia(),
  render: () => h(App),
});
app.use(PiniaVuePlugin);

app.mount("#app");
