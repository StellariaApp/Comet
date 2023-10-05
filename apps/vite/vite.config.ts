import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
// import { PluginVite } from "@stellaria/comet/vite";

export default defineConfig({
  plugins: [preact()],
  server: {
    port: 3003,
  },
});
