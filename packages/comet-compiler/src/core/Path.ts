import { win32, posix } from "node:path";

export const normalizePath = (filename: string) =>
  filename.split(win32.sep).join(posix.sep);
