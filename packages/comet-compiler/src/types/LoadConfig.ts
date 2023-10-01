import { Filter, FilterPattern } from "./CreateFilter";
import { Keys } from "./Keys";

export type Config = {
  packageName?: string;
  include?: FilterPattern;
  exclude?: FilterPattern;
  vars?: Keys;
};

export type ResolvedConfig = {
  root: string;
  packageName: string;
  filter: Filter;
  vars?: Keys;
  dependencies: string[];
};

export type LoadConfigFn = (root: string) => Promise<ResolvedConfig>;
