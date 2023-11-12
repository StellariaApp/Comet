import type { CSSTheme } from '../../../types';
import { css, cv } from '../../../utils/css';

const base: CSSTheme = (theme) => css`
  width: 1em;
  height: 1em;
  path {
    fill: ${theme?.colors?.primary};
  }
  transition: all 0.2s ease-in-out;
`;

export const StylesIcon = cv({
  base
});
