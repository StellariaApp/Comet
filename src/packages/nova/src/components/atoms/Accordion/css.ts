import { css, cv } from '../../../utils/css';
import type { AccordionContainerProps } from './types';

export const StylesAccordionContainer = cv({
  base: (_, props) => {
    const { rotateIcon = true } = props as AccordionContainerProps;
    return css`
      width: 100%;
      height: max-content;
      user-select: none;

      ${rotateIcon &&
      css`
        details[open] {
          summary {
            svg {
              transform: rotate(180deg);
            }
          }
        }
      `}

      transition: all 0.2s ease-in-out;
    `;
  }
});

export const StylesAccordionItem = cv({
  base: (theme) => css`
    width: 100%;
    height: max-content;
    padding: 10px 0;
    border-bottom: ${theme?.colors?.border ?? '1px solid #e5e5e5'};
    list-style: none;
    transition: all 0.2s ease-in-out;
  `
});

export const StylesAccordionTrigger = cv({
  base: (theme) => css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    cursor: pointer;
    background-color: transparent;
    font-size: 14px;
    font-weight: 600;
    color: ${theme?.colors?.text ?? '#000'};

    transition: all 0.2s ease-in-out;
  `
});

export const StylesAccordionContent = cv({
  base: (theme) => css`
    width: 100%;
    padding: 4px 16px;
    font-size: 14px;
    font-weight: 600;
    color: ${theme?.colors?.textSecondary ?? '#000'};

    transition: all 0.2s ease-in-out;
  `
});
