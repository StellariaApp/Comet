import { Keys } from "../types/Keys";

export const FlatObject = (obj?: Keys, prefix = ""): string => {
  if (!obj) return "";
  const result = Object.entries(obj)
    .map(([key, value]) =>
      typeof value === "object"
        ? FlatObject(value, `${prefix}${key}-`)
        : `--${prefix}${key}:${value};`
    )
    .join("\n");
  return result;
};

export const cssWithVars = (css: string, vars?: Keys) => {
  const flatVars = FlatObject(vars);
  const cssWithVars = `:root{\n${flatVars}\n}\n${css}`;
  return cssWithVars;
};
