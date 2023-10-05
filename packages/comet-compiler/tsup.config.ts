import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "plugins/webpack/loader": "src/plugins/webpack/loader.ts",
    "plugins/webpack/cssLoader": "src/plugins/webpack/cssLoader.ts",
    "plugins/webpack/plugin": "src/plugins/webpack/plugin.ts",
    "plugins/vite": "src/plugins/vite.ts",
    "plugins/next": "src/plugins/next.ts",
  },
  onSuccess: "npm run copy",
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
});
