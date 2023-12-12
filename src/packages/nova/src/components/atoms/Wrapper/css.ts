import { css, cv } from '../../../utils/css';

const cssBase = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: max-content;
`;

const cssDisabled = css`
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

export const StylesWrapper = cv({
  base: cssBase,
  disabled: cssDisabled
});
