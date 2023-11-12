import { useTheme } from '../../../hooks/useTheme';
import { cssProps } from '../../../utils/css';
import { StylesWrapper } from './css';
import type { WrapperProps } from './types';

export const Styles = (props: WrapperProps) => {
  const { className } = props;
  const { cssTheme } = useTheme();

  const styles = StylesWrapper(props);
  const cssWithProps = cssProps(props);
  const cssWithTheme = cssTheme(props, 'button');

  const classes = [styles, cssWithProps, className, cssWithTheme].join(' ');

  return {
    classes
  };
};
