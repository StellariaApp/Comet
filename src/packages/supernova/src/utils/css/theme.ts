import { cx } from '@emotion/css';
import type { CSSTheme } from '../../types/css';
import type { Palette } from '../../types/palette';

type WithTheme = {
  [key: string]: unknown;
  css?: CSSTheme;
};

export const cssTheme = (
  propsUnknown?: unknown,
  theme?: Palette,
  key?: string
) => {
  if (!theme) return null;

  const props = propsUnknown as WithTheme | undefined;

  const cssPropsComponent = theme.components?.[key ?? '']?.(theme, props);
  const cssProps = props?.css?.(theme, props);
  return cx([cssPropsComponent, cssProps]);
};
