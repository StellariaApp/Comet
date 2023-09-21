import path from "node:path";
import { GetPackageJson } from "./GetPackageJson";
import { IsESMFn } from "../types/IsESM";

export const IsESM: IsESMFn = (filename) => {
  const { dir, ext } = path.parse(filename);

  if (/^\.m[jt]s$/.test(ext)) return true;
  else if (/^\.c[jt]s$/.test(ext)) return false;

  const result = GetPackageJson(dir);

  if (result?.packageJson.type === "module") return true;

  return false;
};
