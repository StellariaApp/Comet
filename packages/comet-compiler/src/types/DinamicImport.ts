export type DinamicImportFn = (
  file: string,
  isESM: boolean
) => Promise<unknown>;
