import { useTheme } from '../../../hooks/useTheme';
import { cssProps, cx } from '../../../utils/css';
import { StylesButton } from './css';
import type { ButtonProps } from './types';

export const Styles = (props: ButtonProps) => {
  const { className } = props;
  const { cssTheme, theme } = useTheme();

  const styles = StylesButton(props, theme);
  const cssWithProps = cssProps(props);
  const cssWithTheme = cssTheme(props, 'button');

  const classes = cx([styles, cssWithProps, className, cssWithTheme]);

  return {
    classes
  };
};
