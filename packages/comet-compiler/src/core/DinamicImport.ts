import { createRequire } from "node:module";
import { DinamicImportFn } from "../types/DinamicImport";

export const DynamicImport: DinamicImportFn = async (file, isESM) => {
  const require = createRequire(import.meta.url);
  if (!isESM) return require(file) as unknown;
  return (await import(file)) as unknown;
};
