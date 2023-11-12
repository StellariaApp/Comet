import { useTheme } from '../../../hooks/useTheme';
import { cssProps, cx } from '../../../utils/css';
import type { ButtonProps } from '../Button';
import type { IconProps } from '../Icon';
import {
  StylesToastButton,
  StylesToastContainer,
  StylesToastDescription,
  StylesToastIcon,
  StylesToastTitle
} from './css';
import type {
  ToastContainerProps,
  ToastTitleProps,
  ToastDescriptionProps
} from './types';

export const StylesContainer = (props: ToastContainerProps) => {
  const { className } = props;
  const { cssTheme, theme } = useTheme();

  const styles = StylesToastContainer(props, theme);
  const cssWithProps = cssProps(props);
  const cssWithTheme = cssTheme(props, 'toast.container');

  const classes = cx([styles, cssWithProps, className, cssWithTheme]);

  return {
    classes
  };
};

export const StylesIcon = (props: IconProps) => {
  const { className } = props;
  const { cssTheme, theme } = useTheme();

  const styles = StylesToastIcon(props, theme);
  const cssWithProps = cssProps(props);
  const cssWithTheme = cssTheme(props, 'toast.icon');

  const classes = cx([styles, cssWithProps, className, cssWithTheme]);

  return {
    classes
  };
};

export const StylesButton = (props: ButtonProps) => {
  const { className } = props;
  const { cssTheme, theme } = useTheme();

  const styles = StylesToastButton(props, theme);
  const cssWithProps = cssProps(props);
  const cssWithTheme = cssTheme(props, 'toast.button');

  const classes = cx([styles, cssWithProps, className, cssWithTheme]);

  return {
    classes
  };
};

export const StylesTitle = (props: ToastDescriptionProps) => {
  const { className } = props;
  const { cssTheme, theme } = useTheme();

  const styles = StylesToastTitle(props, theme);
  const cssWithProps = cssProps(props);
  const cssWithTheme = cssTheme(props, 'toast.title');

  const classes = cx([styles, cssWithProps, className, cssWithTheme]);

  return {
    classes
  };
};

export const StylesDescription = (props: ToastTitleProps) => {
  const { className } = props;
  const { cssTheme, theme } = useTheme();

  const styles = StylesToastDescription(props, theme);
  const cssWithProps = cssProps(props);
  const cssWithTheme = cssTheme(props, 'toast.description');

  const classes = cx([styles, cssWithProps, className, cssWithTheme]);

  return {
    classes
  };
};
