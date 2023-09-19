import { win32, posix } from "node:path";
import type { NormalizePathFn } from "../types/NormalizePath";

export const NormalizePath: NormalizePathFn = (filename) =>
  filename.split(win32.sep).join(posix.sep);
