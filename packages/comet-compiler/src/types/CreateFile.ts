type FileOption = {
  root: string;
  filename: string;
  packageName: string;
};

export type CreateFileIdFn = (option: FileOption) => string;
