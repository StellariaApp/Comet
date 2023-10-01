import type * as Vite from "vite";

import { Transform } from "../core/Transform";

import { ResolvedConfig } from "../types/LoadConfig";
import { LoadConfig } from "../core/LoadConfig";
import {
  CSS_PARAM_NAME,
  RESOLVED_VIRTUAL_MODULE_ID,
  VIRTUAL_MODULE_ID,
} from "../constants";
import { CreateFileId } from "../core/CreateFile";
import { FlatObject, cssWithVars } from "../core/FlatObject";

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

    transform(source, id, options) {
      const [filename] = id.split("?");

      if (!filename) return;
      if (filename.includes("/node_modules/")) return;
      if (!config.filter(filename)) return;

      const fileId = CreateFileId({
        root: config.root,
        filename,
        packageName: config.packageName,
      });

      const { code, css, hasStyles } = Transform(source, {
        fileId,
        filename,
      });

      if (!hasStyles) return;
      if (!css) return;

      const newCSS = cssWithVars(css, config?.vars);

      const params = new URLSearchParams({
        [CSS_PARAM_NAME]: newCSS,
      });

      const importCSS = `import ${JSON.stringify(
        `${VIRTUAL_MODULE_ID}?${params.toString()}`
      )};`;

      const newCode = `${code}\n${importCSS}`;

      return {
        code: newCode,
      };
    },
  };
};
