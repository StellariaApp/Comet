import { EnsureArray } from "../utils/Array";
import { normalizePath } from "./Path";

export type Pattern = RegExp | RegExp[];
export type FilterFn = (filename: string) => boolean;

export const createFilter = (include: Pattern, exclude: Pattern) => {
  const includes = EnsureArray(include);
  const excludes = EnsureArray(exclude);

  const Filter: FilterFn = (filename) => {
    const filenameNormalize = normalizePath(filename);

    for (const matcher of excludes) {
      if (matcher?.test(filenameNormalize)) return false;
    }

    for (const matcher of includes) {
      if (matcher?.test(filenameNormalize)) return true;
    }
    return includes.length === 0;
  };

  return Filter;
};
