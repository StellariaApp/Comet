import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { Comet } from "@stellaria/comet-vite";
import { Comet as CometDev } from "../../packages/comet-compiler/src/plugins/vite";

export default defineConfig({
  plugins: [preact(), CometDev()],
  server: {
    port: 3003,
  },
});
