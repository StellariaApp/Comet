import type { TransformFn } from "../types/Transform";

const ImportSourceRegex =
  /import\s*\{([^}]*)\}\s*from\s*['"]@stellaria\/comet['"]/g;

const CSSRegex =
  /(?<var>const|let|var)\s+(?<name>\w+)\s*=\s*css\s*`(?<css>[^]*?)`/;

const CSSGroupRegex =
  /(?<var>const|let|var)\s+(?<name>\w+)\s*=\s*css\s*`(?<css>[^]*?)`/g;

type Style = {
  var: string;
  name: string;
  css: string;
  hash: string;
};

const StyleSheet = new Map<string, Style>();

export const Transform: TransformFn = (source, config) => {
  const { fileId, filename } = config ?? {};

  var code = source;

  const stylesRaw = source.match(CSSGroupRegex);

  stylesRaw?.forEach((style) => {
    const { var: varType, name, css } = style.match(CSSRegex)?.groups ?? {};
    const hash = generateHash(css + fileId);
    code = code.replace(style, `${varType} ${name} = "${hash}"`);
    StyleSheet.set(`${fileId}:${name}`, { var: varType, name, css, hash });
  });

  const css = Array.from(StyleSheet.values())
    .map(({ hash, css }) => `.${hash}{${css}}`)
    .join("\n");

  return {
    code: code,
    css,
    hasStyles: true,
  };
};

const generateHash = (input: string) => {
  const hash = murmur32(input, 0);
  return hash === 0 ? "" : toAlphabet(hash);
};

const murmur32 = (str: string, seed: number) => {
  let hval = seed === undefined ? 0x811c9dc5 : seed;

  for (let i = 0, l = str.length; i < l; i++) {
    hval ^= str.charCodeAt(i);
    hval +=
      (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
  }

  return hval >>> 0;
};

const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const toAlphabet = (value: number) => {
  const result = [];

  while (true) {
    result.push(ALPHABET[value % ALPHABET.length]);
    value = Math.floor(value / ALPHABET.length);

    if (value === 0) {
      break;
    }
  }

  result.reverse();
  return result.join("");
};
