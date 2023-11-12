import type { CSSTheme } from '../../../types';
import { css, cv } from '../../../utils/css';

const base: CSSTheme = (theme) => css`
  width: max-content;
  height: max-content;
  padding: 0.5rem 1.125rem;
  border-radius: 0.2rem;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  line-height: 1.125rem;
  font-weight: 600;
  color: ${theme?.colors?.text ?? '#ffffff'};
`;

const flat: CSSTheme = (theme) => css`
  box-shadow: 0px 0px 8px #00000025;
  background-color: ${theme?.colors?.primary ?? '#18181b'};
  border: 1px solid ${theme?.colors?.primary ?? '#18181b'};
  color: ${theme?.colors?.textAlt ?? '#ffffff'};
  :hover {
    box-shadow: ${theme?.colors?.shadow ?? '0px 0px 8px #00000080'};
    background-color: ${theme?.colors?.primaryHover ?? '#272727'};
    border: 1px solid ${theme?.colors?.primaryHover ?? '#272727'};
  }
`;

const outline: CSSTheme = (theme) => css`
  box-shadow: ${theme?.colors?.shadowAlt ?? '0px 0px 4px #0000000c'};
  background-color: transparent;
  border: ${theme?.colors?.border ?? '1px solid #d6d6d6'};
  color: ${theme?.colors?.text ?? '#ffffff'};
  :hover {
    box-shadow: ${theme?.colors?.shadowAlt ?? '0px 0px 4px #0000000c'};
    background-color: ${theme?.colors?.secondary ?? '#fcfcfc'};
    color: ${theme?.colors?.text ?? '#474747'};
  }
`;

const none: CSSTheme = (theme) => css`
  padding: 0;
  background-color: transparent;
  color: ${theme?.colors?.text ?? '#18181b'};
`;

const disabled: CSSTheme = () => css`
  background-color: #ebebeb;
  box-shadow: 0px 0px 4px #0000001e;
  border: 1px solid #d6d6d6;
  box-shadow: none;
  color: #afafaf;
  cursor: not-allowed;
  opacity: 0.8 !important;
  :hover {
    box-shadow: none;
    background-color: #ebebeb;
    border: 1px solid #d6d6d6;
  }
`;

export const StylesButton = cv({
  base,
  variant: {
    default: 'flat',
    flat,
    none,
    outline
  },
  disabled
});
