export type TransformOptions = {
  filename?: string;
  fileId?: string;
};

export type TransformOutput = {
  code: string;
  css: string;
  hasStyles: boolean;
};

export type TransformFn = (
  source: string,
  options?: TransformOptions
) => TransformOutput;
