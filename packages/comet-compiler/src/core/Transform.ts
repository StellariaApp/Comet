import { Config } from "../types/Config";
import { generateHash } from "./Hash";
import { StyleSheet, Variables } from "./Map";
import { getVars } from "./Vars";

const ImportRegex =
  /import\s*{\s*([^}]+)\s*}\s*from\s*"(?=@stellaria\/comet)@stellaria\/comet"/;

const CSSConstRegex =
  /(?<var>const|let|var)\s+(?<name>\w+)\s*=\s*css\s*`(?<css>[^]*?)`/;

const CSSObjectRegex = /(?<name>\w+)\s*:\s*css\s*`(?<css>[^]*?)`/;

export type TransformOptions = Config & {
  filename?: string;
  fileId?: string;
};

export const transform = (source: string, config: TransformOptions) => {
  const { fileId } = config ?? {};

  var code = source;

  const notMatched = { code, css: "", map: "", vars: "" };
  const hasImport = code.match(ImportRegex);
  if (!hasImport) return notMatched;

  const functions = hasImport?.[1].split(",").map((i) => i.trim());

  const isUsedVars = functions?.includes("variables");
  if (isUsedVars) {
    code = getVars(code, fileId);
  }

  const stylesRaw = code.match(new RegExp(CSSConstRegex, "g"));
  const stylesObjectRaw = code.match(new RegExp(CSSObjectRegex, "g"));

  stylesRaw?.forEach((style) => {
    const {
      var: varType,
      name,
      css,
    } = style.match(CSSConstRegex)?.groups ?? {};
    const hash = generateHash(css + fileId + name + varType);
    code = code.replace(style, `${varType} ${name} = "${hash}"`);
    StyleSheet.set(`${fileId}:${name}:${varType}`, {
      var: varType,
      name,
      css,
      hash,
    });
  });

  stylesObjectRaw?.forEach((style) => {
    const { name, css } = style.match(CSSObjectRegex)?.groups ?? {};
    const hash = generateHash(css + fileId + name + "object");
    code = code.replace(style, `${name}: "${hash}"`);
    StyleSheet.set(`${fileId}:${name}:object`, {
      var: "object",
      name,
      css,
      hash,
    });
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
