import { CreateFilterFn, FilterFn } from "../types/CreateFilter";
import { EnsureArray } from "../utils/Array";
import { NormalizePath } from "./NormalizePath";

export const CreateFilter: CreateFilterFn = (include, exclude) => {
  const includes = EnsureArray(include);
  const excludes = EnsureArray(exclude);

  const Filter: FilterFn = (filename) => {
    const filenameNormalize = NormalizePath(filename);

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
