import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import * as esbuild from "esbuild";
import type { Config } from "../types/LoadConfig";
import { CONFIG_FILES, DEFAULT_EXCLUDE, DEFAULT_INCLUDE } from "../constants";
import { createFilter } from "./Filter";

import { IsESM } from "./ESM";
import { getPackageJson } from "./Package";
import { getFileName } from "./File";
import { dynamicImport } from "./Import";

export const loadConfig = async (root: string) => {
  let config = {} as Config;
  const filename = getFileName(root, CONFIG_FILES);

  let dependencies: string[] = [];

  if (filename) {
    try {
      dependencies.push(filename);

      const isESM = IsESM(filename);
      const result = await esbuild.build({
        absWorkingDir: root,
        entryPoints: [filename],
        outfile: "comet.js",
        write: false,
        bundle: true,
        format: isESM ? "esm" : "cjs",
        platform: "node",
        sourcemap: "inline",
        metafile: true,
      });

      const code = result.outputFiles[0]?.text ?? "";

      dependencies = Object.keys(result?.metafile?.inputs ?? {}).map(
        (input) => {
          return path.resolve(root, input);
        }
      );

      if (code) {
        const { dir, name } = path.parse(filename);
        const outputFilename = path.join(
          dir,
          `${name}.${Date.now()}.${isESM ? "mjs" : "cjs"}`
        );

        try {
          fs.writeFileSync(outputFilename, code);
          const module = (await dynamicImport(
            isESM ? url.pathToFileURL(outputFilename).href : outputFilename,
            isESM
          )) as { default?: Config };

          if (module.default) config = module.default;
        } finally {
          fs.rmSync(outputFilename);
        }
      }
    } catch {
      /* empty */
    }
  }

  let packageName = config?.packageName ?? "unknown";

  try {
    if (config && config.packageName === undefined) {
      const result = getPackageJson(root);
      if (result?.packageJson.name) {
        packageName = result.packageJson.name;
        dependencies.push(result.filename);
      }
    }
  } catch {
    /* empty */
  }

  return {
    root,
    packageName,
    filter: createFilter(
      config?.include ?? DEFAULT_INCLUDE,
      config?.exclude ?? DEFAULT_EXCLUDE
    ),
    vars: config?.vars,
    dependencies,
  };
};
