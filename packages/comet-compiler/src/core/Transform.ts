import type { TransformFn } from "../types/Transform";

export const Transform: TransformFn = (source, options) => {
  console.log(source);
  return source;
};
