import { Filter, FilterPattern } from "./CreateFilter";
import { Themes } from "./Themes";

export type Config = {
  packageName?: string;
  include?: FilterPattern;
  exclude?: FilterPattern;
  themes?: Themes;
};

export type ResolvedConfig = {
  root: string;
  packageName: string;
  filter: Filter;
  themes?: Themes;
  dependencies: string[];
};

export type LoadConfigFn = (root: string) => Promise<ResolvedConfig>;
