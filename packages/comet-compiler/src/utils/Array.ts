export const EnsureArray = <T>(value: T | T[]): T[] => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return [value];
};
export const IsArray = <T>(value: T | T[]): value is T[] =>
  Array.isArray(value);
