export const generateHash = (input: string) => {
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
