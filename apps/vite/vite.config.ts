import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { Comet } from "@stellaria/comet-vite";
import { Compiler } from "../../packages/comet-compiler";

const CometDev = (opts = {}) => {
  const { fileRegex = /\.(js|ts|tsx|jsx)$/ } = opts as any;
  return {
    name: "Comet Vite Plugin",

    transform(src: string, id: string) {
      if (fileRegex.test(id)) {
        return {
          code: Compiler(src),
        };
      }
    },
  };
};

export default defineConfig({
  plugins: [preact(), CometDev()],
  server: {
    port: 3003,
  },
});
