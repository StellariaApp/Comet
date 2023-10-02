import fs from "node:fs";
import { getFileName } from "./File";
import { PACKAGE_JSON } from "../constants/index";

export type PackageJson = {
  name?: string;
  type?: "module" | "commonjs";
};

export type Result = {
  filename: string;
  packageJson: PackageJson;
};

export const getPackageJson = (dir: string) => {
  const filename = getFileName(dir, [PACKAGE_JSON]);
  if (!filename) return;

  const result = {
    filename,
    packageJson: JSON.parse(fs.readFileSync(filename, "utf8").toString()),
  } as Result;

  return result;
};
