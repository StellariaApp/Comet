const StylesSheet = new Map();

export const Compiler = (source: string) => {
  const regex = /const (\w+) = css`([\s\S]+?)`;/g;
  const match = regex.exec(source);
  if (!match) return source;

  const variableName = match[1];
  const cssContent = match[2];

  const className = hashClassName(cssContent);

  const newSource = source.replace(
    match[0],
    `const ${variableName} = "${className}";`
  );

  console.log(StylesSheet.values());

  return newSource;
};

const hashClassName = (cssContent: string) => {
  const hash = hashString(cssContent);
  const className = `comet_${hash}`;

  if (StylesSheet.has(className)) return className;

  StylesSheet.set(className, cssContent);

  return className;
};

const hashString = (str: string) => {
  let hash = 0;
  if (str.length === 0) return hash;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }

  return hash.toString(36);
};

export default Compiler;
