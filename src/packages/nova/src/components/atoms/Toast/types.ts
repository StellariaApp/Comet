import type { HTMLMotionProps } from 'framer-motion';
import type { MouseEventHandler } from 'react';
import type { CSSProperties } from '../../../types/css';
import type { IconProps } from '../Icon';
import type { ButtonProps } from '../Button';

export type ToastContainerProps = HTMLMotionProps<'figure'> &
  CSSProperties & {
    percentage?: number;
  };
export type ToastTitleProps = HTMLMotionProps<'figcaption'> & CSSProperties;
export type ToastDescriptionProps = HTMLMotionProps<'p'> & CSSProperties;

export type VariantToast = 'success' | 'warning' | 'error' | 'info';

export type ToastProps = {
  title?: string;
  percentage?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  description?: string;
  icon?: IconProps['icon'];
  variant?: VariantToast;
  components?: {
    container?: ToastContainerProps;
    icon?: IconProps;
    button?: ButtonProps;
    title?: ToastTitleProps;
    description?: ToastDescriptionProps;
  };
};
