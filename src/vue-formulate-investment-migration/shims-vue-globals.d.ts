import Vue from "vue";
import { IVueFormulate } from "./shims-vue-formulate";

declare module "vue/types/vue" {
  interface Vue {
    $formulate: IVueFormulate;
  }
}
