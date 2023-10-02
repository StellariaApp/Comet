import fs from "node:fs";
import path from "node:path";
import { normalizePath } from "./Path";

export const isFile = (filename: string) => {
  return fs.statSync(filename, { throwIfNoEntry: false })?.isFile() ?? false;
};

export const isFileName = (dir: string, file: string) => {
  const filename = path.join(dir, file);
  const hasFile = isFile(filename);
  if (hasFile) return filename;
};

export const getFileName = (dir: string, files: string[]) => {
  return files.find((file) => isFileName(dir, file));
};

type IFileOpts = {
  root: string;
  filename: string;
  packageName: string;
};

export const createFileId = (option: IFileOpts) => {
  const relativePath = path.relative(option.root, option.filename);
  return `${option.packageName}/${normalizePath(relativePath)}`;
};
