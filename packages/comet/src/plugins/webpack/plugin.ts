import type { Compiler } from "webpack";
import { loadConfig } from "../../core/Config.js";
import { ResolvedConfig } from "../../types/Config.js";

declare const require: NodeRequire;

export const CSS_PATH = require.resolve("@stellaria/comet/assets/comet.css");

export default class Plugin {
  _config: ResolvedConfig | undefined;

  async loadConfig(root: string) {
    const config = await loadConfig(root);
    this._config = config;
  }

  config() {
    if (this._config) return this._config;
    throw new Error("configuration not initialized or undefined.");
  }

  apply(compiler: Compiler): void {
    compiler.hooks.run.tapPromise("comet:run", async (_) => {
      await this.loadConfig(compiler.context);
    });

    compiler.hooks.watchRun.tapPromise(
      "comet:watchRun",
      async (compilation) => {
        if (this._config) {
          const isConfigChanged = this._config.dependencies
            .map((dependency) => compilation.modifiedFiles?.has(dependency))
            .includes(true);

          if (isConfigChanged) {
            await this.loadConfig(compiler.context);
          }
        } else {
          await this.loadConfig(compiler.context);
        }
      }
    );

    compiler.options.module.rules.push(
      {
        test: /\.(tsx|ts|js|mjs|jsx)$/,
        exclude: /(node_modules|dist)/,
        use: [
          {
            loader: "@stellaria/comet/webpack/loader",
            options: {
              config: this.config.bind(this),
            },
          },
        ],
      },
      {
        test: CSS_PATH,
        use: [
          {
            loader: "@stellaria/comet/webpack/cssLoader",
            options: {
              config: this.config.bind(this),
            },
          },
        ],
      }
    );
  }
}
