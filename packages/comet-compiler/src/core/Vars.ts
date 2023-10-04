import { parseObject } from "./Object";
import { Variables } from "./Map";
import { generateHash } from "./Hash";

const VariablesRegex =
  /(const|var|let)\s+([\w$]+)\s*=\s*variables\(([\s\S]+?)\);/;

export const getVars = (code: string, fileId?: string) => {
  const match = code.match(VariablesRegex);
  const matchmultiple = code.match(new RegExp(VariablesRegex, "g"));

  if (!match) return code;

  let codeVars = code;

  matchmultiple?.forEach((match) => {
    const matchVar = match.match(VariablesRegex);
    if (!matchVar) return;

    const typeVar = matchVar?.[1];
    const nameVar = matchVar?.[2];
    const objectVar = matchVar?.[3];

    const objectFormat = objectVar.replace(
      /(['"])?([a-zA-Z0-9_]+)(['"])?:/g,
      '"$2":'
    );

    const jsonParsed = JSON.parse(objectFormat);

    const nameVarHash = generateHash(`${fileId}-${nameVar}`);

    const { parsed, variables } = parseObject(jsonParsed, nameVarHash);

    variables.forEach(({ variable, value }) => {
      Variables.set(variable, { key: variable, value });
    });

    codeVars = codeVars.replace(
      match,
      `${typeVar} ${nameVar} = variables(${JSON.stringify(parsed)});`
    );

    variables.forEach(({ key, variable }) => {
      const keyName = key.replace(nameVarHash, nameVar);
      const escapedName = keyName.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      const regex = new RegExp(`\\$\\{${escapedName}\\}`, "g");
      codeVars = codeVars.replace(regex, `var(${variable})`);
    });
  });

  return codeVars;
};
