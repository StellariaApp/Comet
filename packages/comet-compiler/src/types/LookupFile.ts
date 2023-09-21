export type LookupFileFn = (dir: string, files: string[]) => string | undefined;

export type IsFileFn = (filename: string) => boolean;
