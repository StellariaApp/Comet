import { existsSync, mkdirSync, writeFileSync } from "fs";
const StylesSheet = new Map<string, string>();

type ICompilerOptions = {
  path: string;
  filename?: string;
};

const defaultOptions: ICompilerOptions = {
  path: "./public/comet",
  filename: "main.css",
};

export const Compiler = (source: string, options?: ICompilerOptions) => {
  const opts = { ...defaultOptions, ...options };
  const regex = /const (\w+) = css`([\s\S]+?)`;/g;

  const newSource = source.replace(regex, (match, variableName, cssContent) => {
    const className = hashClassName(cssContent);
    return `const ${variableName} = "${className}";`;
  });

  const styleSheet = styleSheetGenerator(StylesSheet);
  cssCreateFile(styleSheet, opts);

  return newSource;
};

const cssCreateFile = (css: string, options: ICompilerOptions) => {
  const dirPath = options?.path;
  const filePath = `${dirPath}/${options?.filename}`;
  const fileContent = css;

  try {
    existsSync(dirPath);
    writeFileSync(filePath, fileContent);
  } catch (error) {
    mkdirSync(dirPath, { recursive: true });
    writeFileSync(filePath, fileContent);
  }
};

const styleSheetGenerator = (styles: Map<string, string>) =>
  Array.from(styles).reduce(
    (styleSheet, [className, cssContent]) =>
      `${styleSheet}.${className} { ${cssContent} }`,
    ""
  );

const minify = (cssContent: string) => cssContent.replace(/\s/g, "");

const hashClassName = (cssContent: string) => {
  const hash = hashString(cssContent);
  const className = `comet_${hash}`;

  if (StylesSheet.has(className)) return className;

  StylesSheet.set(className, cssContent);

  return className;
};

const hashString = (str: string) =>
  str
    .split("")
    .reduce((hash, char) => {
      const charCode = char.charCodeAt(0);
      return (hash << 5) - hash + charCode;
    }, 0)
    .toString(36);

export default Compiler;
