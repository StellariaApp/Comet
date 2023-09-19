import { Themes } from "./Themes";

export type TransformOptions = {
  filename?: string;
  fileId?: string;
  themes?: Themes;
};

export type TransformFn = (
  source: string,
  options?: TransformOptions
) => string;
