import { useAtomValue } from 'jotai';
import { useLayoutEffect } from 'react';
import { ThemeAtom } from '../jotai/theme';

export const useTheme = () => {
  const theme = useAtomValue(ThemeAtom);

  const listener = () => {
    theme.set(theme.get());
  };

  useLayoutEffect(() => {
    listener();
    window.addEventListener('storage', listener);
    return () => {
      window.removeEventListener('storage', listener);
    };
  }, []);

  return theme;
};
