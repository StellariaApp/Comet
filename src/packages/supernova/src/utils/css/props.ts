import { css, cx } from '@emotion/css';
import type { CSSPseudos, CSSInterpolation } from '../../types/css';

type WithProps = {
  [key: string]: CSSPseudos | string | number | undefined;
  interactions?: CSSPseudos;
};
export const cssProps = (propsUnknown: unknown) => {
  const props = propsUnknown as WithProps;
  const { interactions, children: _, css: __, ...rest } = props;
  const cssWithProps = css(rest as CSSInterpolation);
  const cssInteractions = css(interactions as CSSInterpolation);
  const styles = cx([cssWithProps, cssInteractions]);
  return styles;
};
