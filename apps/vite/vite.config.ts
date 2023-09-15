import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import comet from "@stellaria/comet-vite";

export default defineConfig({
  plugins: [preact(), comet()],
  server: {
    port: 3003,
  },
});
