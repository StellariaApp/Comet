import { Config } from "@stellaria/comet-compiler";

export const css = (template: TemplateStringsArray, ...args: any[]) => {
  return "comet";
};

export const variables = <T = {}>(vars: T) => vars;

export const defineConfig = (config: Config) => config;
