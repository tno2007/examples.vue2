import { get } from "lodash";
import { get as g } from "get-wild";

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

const isObject = (obj: object) => {
  var result = typeof obj === "object" && obj !== null && !Array.isArray(obj);
  return result;
};

const setObjectsAsArrays = (obj: object, keys: string[]) => {
  let o = JSON.parse(JSON.stringify(obj));

  keys.forEach((k, index) => {
    let value = g(o, k);

    if (value) {
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const v = value[i];
          set(o, k.replace("*", `[${i}]`), [v]);
        }
      }
      if (isObject(value)) {
        set(o, k, [value]);
      }
    }
  });
  return o;
};

export const set = (obj: object, path: any, value: any) => {
  if (Object(obj) !== obj) return obj; // When obj is not an object
  // If not yet an array, get the keys from the string-path
  if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];
  path.slice(0, -1).reduce(
    (
      a: any,
      c: string,
      i: number // Iterate all of them except the last one
    ) =>
      Object(a[c]) === a[c] // Does the key exist and is its value an object?
        ? // Yes: then follow that path
          a[c]
        : // No: create the key. Is the next key a potential array-index?
          (a[c] =
            Math.abs(path[i + 1]) >> 0 === +path[i + 1]
              ? [] // Yes: assign a new array object
              : {}), // No: assign a new plain object
    obj
  )[path[path.length - 1]] = value; // Finally assign the value to the last key
  return obj; // Return the top-level object to allow chaining
};

/**
 * Take an an js/json object an convert it to vue-formulate form format
 * @param obj the js object to convert
 * @param keys the names of keys to convert to arrays
 */
export const toVueFormulateFormat = (obj: object, keys: string[]) => {
  return setObjectsAsArrays(obj, keys);
};
