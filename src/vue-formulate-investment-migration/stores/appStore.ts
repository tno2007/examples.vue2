import { defineStore } from "pinia";

export const useAppStore = defineStore({
  id: "counter",
  state: () => ({
    logicalDataModel: {},
  }),
});
