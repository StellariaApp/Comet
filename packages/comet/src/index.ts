import { Config } from "./types/Config";

export const css = (template: TemplateStringsArray, ...args: any[]) => {
  return "comet";
};

export const variables = <T = {}>(vars: T) => vars;

export const cx = (clases: string[]) => {
  return clases.filter(Boolean).join(" ");
};

export const ct = (boolean: boolean, tr: string, fl?: string) => {
  if (!boolean) return fl ?? "";
  return tr ?? "";
};

type vbase = {
  base?: string;
};

export const cv =
  <T extends vbase>(variants: T) =>
  (variant: keyof T | Partial<Record<keyof T, boolean>>) => {
    const base = variants.base ?? "";

    const isObject = typeof variant === "object";

    if (isObject) {
      const varts = Object.entries(variant as Record<keyof T, boolean>)
        ?.filter(([, value]) => value)
        ?.map(([key]) => variants[key as keyof T]);
      const vartsArray = (varts ?? []) as string[];

      return cx([base, ...vartsArray]);
    } else {
      const varts = variants as Record<keyof T, string>;
      const vart = varts[variant as keyof T] ?? "";
      return cx([base, vart]);
    }
  };

export const defineConfig = (config: Config) => config;
