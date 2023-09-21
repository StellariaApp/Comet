import path from "node:path";
import { NormalizePath } from "./NormalizePath";
import { CreateFileIdFn } from "../types/CreateFile";

export const CreateFileId: CreateFileIdFn = (option) => {
  const relativePath = path.relative(option.root, option.filename);
  return `${option.packageName}+${NormalizePath(relativePath)}`;
};
