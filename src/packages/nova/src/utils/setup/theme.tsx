import { useAtom } from 'jotai';
import { useEffect } from 'react';
import type { Theme } from '../../types/theme';
import type { IThemeAtom } from '../../jotai/theme';
import { ThemeAtom } from '../../jotai/theme';
import { cssTheme } from '../css';

export type IConfig<T extends Theme> = {
  themes: T;
  default?: keyof T;
  children?: React.ReactNode;
};

export const SetupTheme = <T extends Theme>(config: IConfig<T>) => {
  const [theme, setTheme] = useAtom(ThemeAtom);

  useEffect(() => {
    const themes = config.themes;

    const keys = Object.keys(themes) as Array<keyof T>;
    const firstKey = keys[0];
    const defaultKey = config.default ?? firstKey;
    const defaultTheme = themes[defaultKey];

    const set = (key: keyof T) => {
      if (!key) return;
      document.documentElement.dataset.theme = key.toString();
      localStorage.setItem('theme', key.toString());
      // window.dispatchEvent(new Event('storage')) do use in the future
      setTheme((prev) => {
        const newAtom = {
          ...prev,
          key,
          theme: themes[key],
          cssTheme: (props: unknown, keycomponent) =>
            cssTheme(props, defaultTheme, keycomponent)
        } as IThemeAtom;
        return newAtom;
      });
    };

    const toggle = () => {
      const getTheme = document.documentElement.dataset.theme as keyof T | null;
      const index = keys.indexOf(getTheme ?? defaultKey);
      const next = keys[(index + 1) % keys.length];
      set(next);
    };

    const get = () => {
      const getTheme = document.documentElement.dataset.theme as keyof T;
      return getTheme;
    };

    const state = {
      default: defaultKey,
      theme: defaultTheme,
      key: defaultKey,
      themes,
      keys,
      toggle,
      set,
      get,
      cssTheme: (props: unknown, keycomponent: string) =>
        cssTheme(props, defaultTheme, keycomponent)
    } as unknown as IThemeAtom;

    setTheme(state);
  }, [config]);

  useEffect(() => {
    const isBrowser = typeof window !== 'undefined';
    if (!isBrowser) return;
    const { get, set } = theme;
    set(get());
  }, [theme.set]);

  return null;
};
