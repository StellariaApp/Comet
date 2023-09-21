import fs from "node:fs";
import path from "node:path";
import { IsFileFn, LookupFileFn } from "../types/LookupFile";

const IsFile: IsFileFn = (filename) => {
  return fs.statSync(filename, { throwIfNoEntry: false })?.isFile() ?? false;
};

export const LookupFile: LookupFileFn = (dir, files) => {
  while (dir) {
    for (const file of files) {
      const filename = path.join(dir, file);
      if (IsFile(filename)) return filename;
    }
    const parent = path.dirname(dir);
    if (parent === dir) return;
    dir = parent;
  }

  return;
};
