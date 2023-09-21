import { Filter, FilterPattern } from "./CreateFilter";
import { Keys } from "./Keys";
import { Themes } from "./Themes";

export type Config = {
  packageName?: string;
  include?: FilterPattern;
  exclude?: FilterPattern;
  themes?: Themes;
  vars?: Keys;
};

export type ResolvedConfig = {
  root: string;
  packageName: string;
  filter: Filter;
  themes?: Themes;
  vars?: Keys;
  dependencies: string[];
};

export type LoadConfigFn = (root: string) => Promise<ResolvedConfig>;
