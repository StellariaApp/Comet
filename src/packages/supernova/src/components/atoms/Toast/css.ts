import { css, cv } from '../../../utils/css';
import type { ToastContainerProps } from './types';

export const StylesToastContainer = cv({
  base: (theme, props) => {
    const { percentage = 0 } = props as ToastContainerProps;
    return css`
      width: max-content;
      height: max-content;
      border: ${theme?.colors?.border ?? '1px solid #e5e5e5'};
      border-radius: ${theme?.colors?.borderRadius ?? '4px'};
      padding: 12px 16px ${percentage > 0 ? 20 : 12}px 16px;
      display: grid;
      grid-template-areas:
        'icon title close'
        'icon description close';
      grid-template-columns: max-content 1fr max-content;
      cursor: pointer;
      gap: 0px 4px;

      position: relative;

      :after {
        position: absolute;
        content: '';
        width: ${percentage}%;
        bottom: 0;
        height: 8px;
        border-top: ${theme?.colors?.border ?? '1px solid #3f3f3f'};
        border-right: ${theme?.colors?.border ?? '1px solid #3f3f3f'};
        background-color: ${theme?.colors?.secondary ?? '#18181b'};
        transition: all 0.2s ease-in-out, width 1s linear;
      }

      transition: all 0.2s ease-in-out;
    `;
  }
});

export const StylesToastIcon = cv({
  base: () => css`
    width: 16px;
    height: 16px;
    grid-area: icon;
    grid-row-start: 1;
    grid-row-end: 1;
    align-self: center;
    justify-self: center;
    transition: all 0.2s ease-in-out;
  `
});

export const StylesToastButton = cv({
  base: (theme) => css`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    padding: 2px;
    grid-area: close;
    background-color: transparent;
    border: none;
    background-color: ${theme?.colors?.secondary ?? '#18181b'};
    box-shadow: none;
    :before {
      content: '';
      position: absolute;
      width: 120%;
      height: 120%;
      background-color: transparent;
      z-index: -1;
      transition: all 0.2s ease-in-out;
    }
    :hover {
      border: none;
      box-shadow: none;
      background-color: ${theme?.colors?.secondaryHover ?? '#272727'};
    }

    svg {
      width: 14px;
      height: 14px;
    }

    transition: all 0.2s ease-in-out;
  `
});

export const StylesToastTitle = cv({
  base: (theme) => css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2px 8px;
    cursor: pointer;
    background-color: transparent;
    font-size: 14px;
    font-weight: 600;
    color: ${theme?.colors?.text ?? '#000'};
    grid-area: title;
    user-select: none;

    transition: all 0.2s ease-in-out;
  `
});

export const StylesToastDescription = cv({
  base: (theme) => css`
    width: 100%;
    font-size: 12px;
    padding: 2px 8px;
    font-weight: 500;
    color: ${theme?.colors?.textSecondary ?? '#000'};
    grid-area: description;
    user-select: none;

    transition: all 0.2s ease-in-out;
  `
});
