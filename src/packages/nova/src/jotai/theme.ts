import { atom } from 'jotai';
import type { Theme } from '../types/theme';

export type IThemeAtom = {
  default: keyof Theme;
  theme: Theme[keyof Theme];
  themes: Theme;
  key: keyof Theme;
  keys: Array<keyof Theme>;
  toggle: () => void;
  set: (key: keyof Theme) => void;
  get: () => keyof Theme;
  cssTheme: (props?: unknown, key?: string) => string | null;
};

export const ThemeAtom = atom({
  default: null,
  theme: null,
  themes: [],
  key: null,
  keys: [],
  toggle: () => null,
  set: () => null,
  get: () => null,
  cssTheme: () => null
} as unknown as IThemeAtom);
