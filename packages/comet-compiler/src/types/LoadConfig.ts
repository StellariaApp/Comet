import { Keys } from "./Keys";
import { FilterFn, Pattern } from "../core/Filter";

export type Config = {
  packageName?: string;
  include?: Pattern;
  exclude?: Pattern;
  vars?: Keys;
};

export type ResolvedConfig = {
  root: string;
  packageName: string;
  filter: FilterFn;
  vars?: Keys;
  dependencies: string[];
};
