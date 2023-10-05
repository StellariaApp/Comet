type Style = {
  var: string;
  name: string;
  css: string;
  hash: string;
};

type Variable = {
  key: string;
  value: string;
};

export const StyleSheet = new Map<string, Style>();
export const Variables = new Map<string, Variable>();
