import { createRequire } from "node:module";

export const dynamicImport = async (file: string, isESM: boolean) => {
  const require = createRequire(__filename);
  if (!isESM) return require(file) as unknown;
  return (await import(require.resolve(file))) as unknown;
};
