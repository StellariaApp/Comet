import type * as Vite from "vite";

import { ResolvedConfig } from "../types/LoadConfig";
import { LoadConfig } from "../core/LoadConfig";
import {
  CSS_PARAM_NAME,
  RESOLVED_VIRTUAL_MODULE_ID,
  VIRTUAL_MODULE_ID,
} from "../constants";
import { CreateFileId } from "../core/CreateFile";
import { Transform } from "../core/Transform";

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

      if (!filename) return;
      if (filename.includes("/node_modules/")) return;
      if (!config.filter(filename)) return;

      const fileId = CreateFileId({
        root: config.root,
        filename,
        packageName: config.packageName,
      });
      const result = Transform(code, {
        filename,
        fileId,
        themes: config.themes,
      });

      console.log("Transform", filename, fileId);
    },
  };
};

export default Comet;
