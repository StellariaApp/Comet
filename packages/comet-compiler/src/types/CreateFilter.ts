export type FilterPattern = RegExp | RegExp[];
export type Filter = (filename: string) => boolean;

export type FilterFn = (filename: string) => boolean;
export type CreateFilterFn = (
  include?: FilterPattern,
  exclude?: FilterPattern
) => FilterFn;
