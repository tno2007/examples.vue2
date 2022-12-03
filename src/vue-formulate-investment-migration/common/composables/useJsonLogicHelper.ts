import { boolify, getObjectValue } from "./useFormHelper";

export function $get(this: any, keyPath: string) {
  return getObjectValue(this, keyPath);
}

export function $bool(this: any, keyPath: string) {
  const result = getObjectValue(this, keyPath);
  if (typeof result === "undefined") return undefined;
  return boolify(result);
}
