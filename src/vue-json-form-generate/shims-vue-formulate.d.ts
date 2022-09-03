declare module "@braid/vue-formulate" {
  export const apply = () => {};
}

declare module "dataobject-parser" {
  export interface DataObjectParser {
    data(): any;
  }
  export function transpose($flat: object): DataObjectParser;
  export function untranspose($structured: object): any[];
}

jsonLogic.apply({
  "==": [1, 1],
});

jsonLogic.apply({
  and: [
    // rule
    { ">": [3, 1] },
    // data
    { "<": [1, 3] },
  ],
});
