import type { HTMLMotionProps } from 'framer-motion';
import type { CSSProperties } from '../../../types/css';

export type IButtonHTML = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type IButton = IButtonHTML & HTMLMotionProps<'button'>;

export type VariantButton = 'flat' | 'outline' | 'none';

export type ButtonProps = IButton &
  CSSProperties & {
    disabled?: boolean;
    variant?: VariantButton;
    children?: React.ReactNode;
  };
