declare module "json-logic-js" {
  //export interface DataObjectParser {
  //  data(): any;
  //}

  export const apply = (rules: object, data?: object) => object;
  export const add_operation = (funcName: string, func: Function) => any;
}
