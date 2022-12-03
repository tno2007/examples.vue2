export type IModel = {
  [key: string]: any;
};

export interface ISchemaOption {
  label: string;
  value: string | number;
}

export interface ISchema {
  component?: string;
  children?: string | ISchema[];
  type?:
    | "group"
    | "customgroup"
    | "select"
    | "text"
    | "checkbox"
    | "yearmonthday"
    | "radio"
    | "textarea";
  name?: string;
  label?: string;
  placeholder?: string;
  validation?: string;
  options?: ISchemaOption[];
  format?: "date";
  visible?: boolean | object;
  if?: object;
}
