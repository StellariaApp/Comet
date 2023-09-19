import fs from "node:fs";
import { LookupFile } from "./LookupFile";
import { PACKAGE_JSON } from "../constants/index.js";
import { GetPackageJsonFn } from "../types/GetPackageJson";

export const GetPackageJson: GetPackageJsonFn = (dir) => {
  const filename = LookupFile(dir, [PACKAGE_JSON]);
  if (!filename) return undefined;
  return {
    filename,
    packageJson: JSON.parse(fs.readFileSync(filename, "utf8").toString()),
  };
};
