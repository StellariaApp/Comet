import { Themes } from "./Themes";

export type TransformOptions = {
  filename?: string;
  fileId?: string;
  themes?: Themes;
};

export type TransformOutput = {
  code: string;
  map: string;
  css: string;
};

export type TransformFn = (
  source: string,
  options?: TransformOptions
) => TransformOutput;
