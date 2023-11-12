import type { Ref } from 'react';
import { forwardRef } from 'react';
import { Icon, type IconProps } from '../../Icon';
import { StylesIcon } from '../styles';

const ToastIconRef = (props: IconProps, ref: Ref<SVGSVGElement>) => {
  const { icon } = props;
  const { classes } = StylesIcon(props);
  return (
    <Icon
      width={14}
      height={14}
      {...props}
      ref={ref}
      icon={icon ?? 'info'}
      className={classes}
    />
  );
};

export const ToastIcon = forwardRef(ToastIconRef);
