import { existsSync, mkdirSync, writeFileSync } from "fs";
const StylesSheet = new Map<string, string>();

export const Compiler = (source: string) => {
  const regex = /const (\w+) = css`([\s\S]+?)`;/g;

  const newSource = source.replace(regex, (match, variableName, cssContent) => {
    const className = hashClassName(cssContent);
    return `const ${variableName} = "${className}";`;
  });

  const styleSheet = minify(styleSheetGenerator(StylesSheet));
  cssFile(styleSheet);

  return newSource;
};

const cssFile = (css: string) => {
  const dirPath = `./dist`;
  const filePath = `./dist/comet.css`;
  const fileContent = css;

  if (!existsSync(dirPath)) mkdirSync(dirPath);

  writeFileSync(filePath, fileContent);
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
