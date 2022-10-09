import { get, set } from "lodash";

export function getObjectValue(o: any, s: string) {
  s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  s = s.replace(/^\./, ""); // strip a leading dot
  var a = s.split(".");
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (o === Object(o) && k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
}

export const filledIn = (obj: any) => {
  return !notFilledIn(obj);
};

// source: https://stackoverflow.com/a/61244150/958398
export const notFilledIn = (obj: any) => {
  if (!obj && typeof obj !== "boolean") return true;
  if (typeof obj == "number") return false;
  else if (typeof obj == "string") return obj.length == 0;
  else if (Array.isArray(obj)) return obj.length == 0;
  else if (typeof obj == "object")
    return obj == null || Object.keys(obj).length == 0;
  // exclude bool checks
  //else if (typeof obj == "boolean") return false;
};

const setObjectsAsArrays = (obj: object, keys: string[]) => {
  keys.forEach((k, index) => {
    const value = get(obj, k) ?? {};
    set(obj, k, [value]);
  });
  return obj;
};

/**
 * Take an an js/json object an convert it to vue-formulate form format
 * @param obj the js object to convert
 * @param keys the names of keys to convert to arrays
 */
export const toVueFormulateFormat = (obj: object, keys: string[]) => {
  return setObjectsAsArrays(obj, keys);
};
