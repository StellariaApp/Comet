import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
// import { PluginVite } from "@stellaria/comet-vite";
import { PluginVite } from "../../packages/comet-compiler/src/plugins/vite";

export default defineConfig({
  plugins: [preact(), PluginVite()],
  server: {
    port: 3003,
  },
});
