import type { NextConfig } from "next";

const withComet = (nextConfig: NextConfig) =>
  ({
    ...nextConfig,
    webpack: (config, args) => {
      config.module.rules.push({
        test: /\.(js|ts|tsx|jsx)$/,
        exclude: /node_modules/,
        use: "@stellaria/comet-compiler",
      });

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, args);
      }

      return config;
    },
  } as NextConfig);

module.exports = withComet;
