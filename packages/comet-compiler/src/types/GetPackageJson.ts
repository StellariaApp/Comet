export type PackageJson = {
  name?: string;
  type?: "module" | "commonjs";
};

export type Result = {
  filename: string;
  packageJson: PackageJson;
};

export type GetPackageJsonFn = (dir: string) => Result | undefined;
