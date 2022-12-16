import { defineStore } from "pinia";
//\ccoimport { FormModel } from "../typings/FormModel";

interface Collection {
  Code: string;
  Description: string;
}

export const useAppStore = defineStore({
  id: "counter",
  state: () => ({
    formModel: {} as any,
    customCollections: {
      countries: [],
      genders: [],
      BrpLocations: [],
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
