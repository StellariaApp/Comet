import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { Comet } from "@stellaria/comet-vite";

export default defineConfig({
  plugins: [preact(), Comet()],
  server: {
    port: 3003,
  },
});
