import { defineStore } from "pinia";
import { IPerson } from "../common/typings";

export type RootState = {
  people: IPerson[];
};

export const useAppStore = defineStore({
  id: "counter",
  state: () =>
    ({
      people: [],
    } as RootState),
});
