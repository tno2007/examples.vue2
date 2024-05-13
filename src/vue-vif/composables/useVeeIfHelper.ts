import { apply } from "json-logic-js";
import type { ISchema } from "../typings";

let schemaId = 0;

// helper functions
const removeChildren = (o: ISchema) => {
  if (o.children?.length) o.children = undefined;
  return o;
};

// main functions
const makeFlat = (
  data: object,
  schema: ISchema[],
  parentId: number | null = null
) => {
  let result: ISchema[] = [];

  for (const s of schema) {
    const rule = s.vif;
    const logicResult = apply(rule, data);

    s.visible = logicResult;

    result.push({
      ...s,
      id: ++schemaId,
      parent: parentId,
    });

    if (Array.isArray(s.children)) {
      result = result.concat(makeFlat(data, s.children, schemaId));
    }
  }

  return result;
};

const flatten = (d: object, s: ISchema[]) => {
  schemaId = 0;
  const f = makeFlat(d, s);
  const o = orphan(f);
  return o;
};

const orphan = (flatSchema: ISchema[]) => {
  const result = flatSchema.map((value, index, array) => {
    return removeChildren(value);
  });

  return result;
};

const restructure = (flatSchema: ISchema[]) => {
  const result: ISchema[] = [];

  for (const s of flatSchema) {
    if (s.parent) {
      const parent: any = deepSearchByKey(result, "id", s.parent);

      if (parent.length) {
        if (parent[0].children === undefined) parent[0].children = [];
        parent[0]?.children?.push(s);
      }
    } else {
      result.push(s);
    }
  }

  return result;
};

const deepSearchByKey = (
  object: any,
  originalKey: string,
  originalValue: any,
  matches: any[] = []
) => {
  if (object != null) {
    if (Array.isArray(object)) {
      for (const arrayItem of object) {
        deepSearchByKey(arrayItem, originalKey, originalValue, matches);
      }
    } else if (typeof object === "object") {
      for (const key of Object.keys(object)) {
        if (key === originalKey) {
          if (object[key] === originalValue) {
            matches.push(object);
          }
        }
        deepSearchByKey(object[key], originalKey, originalValue, matches);
      }
    }
  }
  return matches;
};

export { flatten, restructure };
