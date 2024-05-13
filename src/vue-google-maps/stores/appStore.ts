import { defineStore } from "pinia";
import { FormModel } from "../typings/FormModel";

//var a = new FormModel();
//console.log("appStore", a);

export const useAppStore = defineStore({
  id: "counter",
  state: () => ({
    formModel: new FormModel(),
  }),
});
