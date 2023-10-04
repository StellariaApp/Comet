import { Keys } from "../types/Keys";

export type FlatObject = {
  variable: string;
  value: string;
  key: string;
};

const initParams = {
  prefix: "",
  suffix: "",
  key: "key" as keyof FlatObject,
};

type JoinParams = Partial<typeof initParams>;
type JoinFn = (prev?: FlatObject, params?: JoinParams) => string;

const Join: JoinFn = (prev, params) => {
  const { prefix, suffix, key } = params ?? initParams;
  return `${prefix ?? ""}${prev?.[key ?? "key"] ?? ""}${suffix ?? ""}`;
};

export const parseObject = (obj?: Keys, hash?: string) => {
  const result = flatObject(obj, hash);
  const newObject = result.reduce((prev: Keys, curr: FlatObject) => {
    const { key, variable } = curr;
    const keys = key.split(".");
    const lastKey = keys.pop();
    const lastObject = keys.reduce((prev: any, curr: string) => {
      if (!prev[curr]) prev[curr] = {};
      return prev[curr];
    }, prev);
    lastObject[lastKey ?? ""] = `var(${variable})`;
    return prev;
  }, {} as Keys);
  return {
    parsed: newObject[hash ?? ""],
    variables: result,
  };
};

export const flatObject = (
  obj?: Keys,
  hash?: string,
  parent?: FlatObject
): FlatObject[] => {
  if (!obj) return [];

  const result = Object.entries(obj)
    .map(([keyObject, valueObject]) => {
      const isObject = typeof valueObject === "object";

      const key = Join(parent, {
        prefix: parent ? "" : hash ? hash + "." : "",
        suffix: (parent ? "." : "") + keyObject,
        key: "key",
      });

      const variable = Join(parent, {
        prefix: parent ? "" : `--${hash ? hash + "-" : ""}`,
        suffix: (parent ? "-" : "") + keyObject,
        key: "variable",
      });

      const newParent = {
        key,
        variable,
        value: isObject ? "" : valueObject,
      } as FlatObject;

      if (!isObject) return newParent;
      const child = flatObject(valueObject, hash, newParent);
      return child;
    })
    .flat();

  return result as FlatObject[];
};
