import type { LoaderContext, LoaderDefinitionFunction } from "webpack";

import { transform } from "../../core/Transform";
import { createFileId } from "../../core/File";
import { CSS_PATH } from "./plugin";
import { ResolvedConfig } from "../../core/Config";

type WebpackLoaderParams = Parameters<LoaderDefinitionFunction<never>>;
export const CSS_PARAM_NAME = "css";

export type LoaderOption = {
  config: () => ResolvedConfig;
};

export default function loader(
  this: LoaderContext<LoaderOption>,
  source: WebpackLoaderParams[0],
  map: WebpackLoaderParams[1]
) {
  try {
    const config = this.getOptions().config();

    const fileName = this.resourcePath;

    if (!config.filter(fileName)) {
      this.callback(undefined, source, map);

      for (const dependency of config.dependencies) {
        this.addDependency(dependency);
      }
      return;
    }

    const fileId = createFileId({
      root: config.root,
      filename: fileName,
      packageName: config.packageName,
    });

    const { code, css } = transform(source, {
      filename: fileName,
      fileId,
    });

    if (!css) {
      this.callback(undefined, source, map);
      return;
    }

    for (const dependency of config.dependencies) {
      this.addDependency(dependency);
    }

    const params = new URLSearchParams({
      [CSS_PARAM_NAME]: css,
    });

    const importCSS = `import ${JSON.stringify(
      `${this.utils.contextify(this.context, CSS_PATH)}?${params.toString()}`
    )};`;

    this.callback(undefined, `${code}\n${importCSS}`, map);
  } catch (error) {
    console.error(error);
  }
}
