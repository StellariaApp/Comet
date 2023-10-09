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

export const transform = (code: string, config: TransformOptions) => {
  const { fileId } = config ?? {};
  var css = "";

  const notMatched = { code, css: "" };
  const hasImport = code.match(ImportRegex);

  if (!hasImport) return notMatched;

  // const functions = hasImport?.[1]?.split(",").map((i) => i.trim());

  // const isUsedVars = functions?.includes("variables");
  // const isUsedCSS = functions?.includes("css");

  code = getVars(code, fileId);

  const stylesRaw = code.match(new RegExp(CSSConstRegex, "g"));

  const stylesObjectRaw = code.match(new RegExp(CSSObjectRegex, "g"));

  stylesRaw?.forEach((style) => {
    const {
      var: varType,
      name,
      css,
    } = style.match(CSSConstRegex)?.groups ?? {};
    const hash = generateHash(fileId + name + varType);
    code = code.replace(style, `${varType} ${name} = "${hash}"`);
    StyleSheet.set(hash, {
      var: varType,
      name,
      css,
      hash,
    });
  });

  stylesObjectRaw?.forEach((style) => {
    const { name, css } = style.match(CSSObjectRegex)?.groups ?? {};
    const hash = generateHash(fileId + name + "object");
    code = code.replace(style, `${name}: "${hash}"`);
    StyleSheet.set(hash, {
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

  css = Array.from(StyleSheet.values())
    .map(({ hash, css }) => `.${hash}{${css}}`)
    .join("\n");

  css = `${rootVars}\n${css}`;

  return {
    code,
    css,
  };
};
