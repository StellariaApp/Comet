export const PACKAGE_JSON = "package.json";

export const CONFIG_FILES = [
  "comet.config.ts",
  "comet.config.cts",
  "comet.config.mts",
  "comet.config.js",
  "comet.config.cjs",
  "comet.config.mjs",
  "nebula.config.ts",
  "nebula.config.cts",
  "nebula.config.mts",
  "nebula.config.js",
  "nebula.config.cjs",
  "nebula.config.mjs",
];

export const DEFAULT_INCLUDE = /\.(js|jsx|ts|tsx)$/;
export const DEFAULT_EXCLUDE = /node_modules/;

export const VIRTUAL_MODULE_ID = "virtual:comet.css";
export const RESOLVED_VIRTUAL_MODULE_ID = "\0" + VIRTUAL_MODULE_ID;
export const CSS_PARAM_NAME = "css";
