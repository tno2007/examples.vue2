import { defineStore } from "pinia";
import { FormModel } from "../typings/FormModel";

interface Collection {
  Code: string;
  Description: string;
}

export const useAppStore = defineStore({
  id: "counter",
  state: () => ({
    formModel: new FormModel(),
    collections: {
      countries: [],
    },
    defaultCollections: {
      boolean: [
        {
          label: "Yes",
          value: "true",
        },
        {
          label: "No",
          value: "false",
        },
      ],
    },
  }),
});
