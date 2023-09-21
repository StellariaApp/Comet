import type * as Vite from "vite";

import { transform } from "@stellaria/comet-compiler-rust";

import { ResolvedConfig } from "../types/LoadConfig";
import { LoadConfig } from "../core/LoadConfig";
import {
  CSS_PARAM_NAME,
  RESOLVED_VIRTUAL_MODULE_ID,
  VIRTUAL_MODULE_ID,
} from "../constants";
import { CreateFileId } from "../core/CreateFile";
import { FlatObject } from "../core/FlatObject";

export const Comet = (): Vite.Plugin => {
  let config = {} as ResolvedConfig;
  return {
    name: "Comet Vite Plugin",

    async configResolved(viteConfig) {
      config = await LoadConfig(viteConfig.root);
      for (const dependency of config.dependencies) {
        viteConfig.configFileDependencies.push(dependency);
      }
    },

    resolveId(id) {
      const [filename, params] = id.split("?");
      return filename === VIRTUAL_MODULE_ID
        ? `${RESOLVED_VIRTUAL_MODULE_ID}?${params}`
        : undefined;
    },

    load(id) {
      const [filename, _params] = id.split("?");
      if (filename === RESOLVED_VIRTUAL_MODULE_ID) {
        const params = new URLSearchParams(_params);
        return params.get(CSS_PARAM_NAME) ?? "";
      } else {
        return;
      }
    },

    transform(code, id, options) {
      const isSSR = options?.ssr ?? false;

      const [filename] = id.split("?");
      console.log("filename", filename);

      if (!filename) return;
      if (filename.includes("/node_modules/")) return;
      if (!config.filter(filename)) return;

      const fileId = CreateFileId({
        root: config.root,
        filename,
        packageName: config.packageName,
      });
      const varsFlat = FlatObject(config?.vars);
      const result = transform(code, {
        filename,
        fileId,
        helper: `:root{--temp-var:red}`,
      });

      if (result.type === "Err")
        throw new Error(result.errors.map((err) => err.message).join("\n"));
      if (!result.css) return;
      if (isSSR) return { code: result.code, map: result.map };
      const params = new URLSearchParams({
        [CSS_PARAM_NAME]: result.css,
      });
      const importCSS = `import ${JSON.stringify(
        `${VIRTUAL_MODULE_ID}?${params.toString()}`
      )};`;
      const newCode = `${result.code}\n${importCSS}`;
      return {
        code: newCode,
        map: result.map,
      };
    },
  };
};
