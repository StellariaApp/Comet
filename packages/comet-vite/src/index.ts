import { Compiler } from "../../comet-compiler";

type Opts = {
  fileRegex?: RegExp;
};

export const Comet = (opts: Opts = {}) => {
  const { fileRegex = /\.(js|ts|tsx|jsx)$/ } = opts;
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

export default Comet;
