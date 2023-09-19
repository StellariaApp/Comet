import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import * as esbuild from "esbuild";
import type { Config, LoadConfigFn } from "../types/LoadConfig";
import { CONFIG_FILES, DEFAULT_INCLUDE } from "../constants";
import { CreateFilter } from "./CreateFilter";

import { IsESM } from "./IsESM";
import { GetPackageJson } from "./GetPackageJson";
import { LookupFile } from "./LookupFile";
import { DynamicImport } from "./DinamicImport";

export const LoadConfig: LoadConfigFn = async (root) => {
  const filename = LookupFile(root, CONFIG_FILES);

  let config = {} as Config;

  let dependencies: string[] = [];

  if (filename) {
    try {
      dependencies.push(filename);

      const isESM = IsESM(filename);
      const result = await esbuild.build({
        absWorkingDir: root,
        entryPoints: [filename],
        outfile: "excss.js",
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
          const module = (await DynamicImport(
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
      const result = GetPackageJson(root);
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
    filter: CreateFilter(config?.include ?? DEFAULT_INCLUDE, config?.exclude),
    themes: config?.themes,
    dependencies,
  };
};
