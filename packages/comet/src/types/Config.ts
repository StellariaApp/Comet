import { FilterFn, Pattern } from "../core/Filter";

export type Config = {
  include?: Pattern;
  exclude?: Pattern;
};

export type ResolvedConfig = {
  root: string;
  packageName: string;
  filter: FilterFn;
  config?: Config;
  dependencies: string[];
};
