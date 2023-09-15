import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { Compiler } from "@stellaria/comet-compiler";

export default defineConfig({
  plugins: [preact(), myPlugin()],
  server: {
    port: 3003,
  },
});

const fileRegex = /\.(js|ts|tsx|jsx)$/;

function myPlugin() {
  return {
    name: "transform-file",

    transform(src, id) {
      if (fileRegex.test(id)) {
        return {
          code: Compiler(src),
        };
      }
    },
  };
}
