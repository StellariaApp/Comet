import type { Ref } from 'react';
import { forwardRef } from 'react';
import { Button, type ButtonProps } from '../../Button';
import { StylesButton } from '../styles';
import { Icon } from '../../Icon';

const ToastButtonRef = (props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
  const { onClick } = props;
  const { classes } = StylesButton(props);
  return (
    <Button
      {...props}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      ref={ref}
      className={classes}
    >
      <Icon icon="xmark" />
    </Button>
  );
};

export const ToastButton = forwardRef(ToastButtonRef);
