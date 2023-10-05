import type { NextConfig } from "next";
import type { Configuration } from "webpack";
import WebpackPlugin from "./webpack/plugin";

export const PluginNext = (nextConfig: NextConfig): NextConfig => {
  return {
    ...nextConfig,
    webpack(config: Configuration, options) {
      config.plugins?.push(new WebpackPlugin());
      config.infrastructureLogging = { level: "error" };

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options) as unknown;
      }

      return config;
    },
  };
};
