import { useTheme } from '../../../hooks/useTheme';
import { cssProps, cx } from '../../../utils/css';
import { StylesIcon } from './css';
import type { IconProps } from './types';

export const Styles = (props: IconProps) => {
  const { className } = props;
  const { cssTheme, theme } = useTheme();

  const styles = StylesIcon(props, theme);
  const cssWithProps = cssProps(props);
  const cssWithTheme = cssTheme(props, 'icon');

  const classes = cx([styles, cssWithProps, className, cssWithTheme]);

  return {
    classes
  };
};
