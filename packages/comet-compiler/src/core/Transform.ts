import type { TransformFn } from "../types/Transform";
import { ParseObject } from "./FlatObject";

const ImportRegex =
  /import\s*{\s*([^}]+)\s*}\s*from\s*"(?=@stellaria\/comet)@stellaria\/comet"/;

const CSSRegex =
  /(?<var>const|let|var)\s+(?<name>\w+)\s*=\s*css\s*`(?<css>[^]*?)`/;

type Style = {
  var: string;
  name: string;
  css: string;
  hash: string;
};

const StyleSheet = new Map<string, Style>();

type Variable = {
  key: string;
  value: string;
};

const Variables = new Map<string, Variable>();

export const Transform: TransformFn = (source, config) => {
  const { fileId } = config ?? {};

  var code = source;

  const notMatched = { code, css: "", map: "", vars: "" };
  const hasImport = code.match(ImportRegex);
  if (!hasImport) return notMatched;

  const functions = hasImport?.[1].split(",").map((i) => i.trim());

  code = getVars(code, functions);

  const stylesRaw = code.match(new RegExp(CSSRegex, "g"));

  stylesRaw?.forEach((style) => {
    const { var: varType, name, css } = style.match(CSSRegex)?.groups ?? {};
    const hash = generateHash(css + fileId);
    code = code.replace(style, `${varType} ${name} = "${hash}"`);
    StyleSheet.set(`${fileId}:${name}`, { var: varType, name, css, hash });
  });

  const vars = Array.from(Variables.values())
    .map(({ key, value }) => `${key}:${value};`)
    .join("\n");

  const rootVars = `:root{\n${vars}\n}`;

  const css = Array.from(StyleSheet.values())
    .map(({ hash, css }) => `.${hash}{${css}}`)
    .join("\n");

  const cssWithRoot = `${rootVars}\n${css}`;

  return {
    code: code,
    css: cssWithRoot,
    vars: "",
  };
};

const VariablesRegex =
  /(const|var|let)\s+([\w$]+)\s*=\s*variables\(([\s\S]+?)\);/;

const getVars = (code: string, functions: string[]) => {
  const isUsed = functions?.includes("variables");
  if (!isUsed) return code;

  const match = code.match(VariablesRegex);
  if (!match) return code;

  const typeVar = match?.[1];
  const nameVar = match?.[2];
  const objectVar = match?.[3];

  const objectFormat = objectVar.replace(
    /(['"])?([a-zA-Z0-9_]+)(['"])?:/g,
    '"$2":'
  );

  const jsonParsed = JSON.parse(objectFormat);

  const { parsed, variables } = ParseObject(jsonParsed);

  variables.forEach(({ variable, value }) => {
    Variables.set(variable, { key: variable, value });
  });

  let codeParse = code.replace(
    VariablesRegex,
    `${typeVar} ${nameVar} = variables(${JSON.stringify(parsed)});`
  );

  variables.forEach(({ key, variable }) => {
    const name = `${nameVar}.${key}`;
    const escapedName = name.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`\\$\\{${escapedName}\\}`, "g");
    codeParse = codeParse.replace(regex, `var(${variable})`);
  });

  return codeParse;
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
