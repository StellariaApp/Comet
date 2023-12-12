import { motion } from 'framer-motion';
import type { Ref } from 'react';
import { forwardRef } from 'react';
import type { ToastTitleProps } from '../types';
import { StylesTitle } from '../styles';

const ToastTitleRef = (props: ToastTitleProps, ref: Ref<HTMLElement>) => {
  const { children } = props;
  const { classes } = StylesTitle(props);
  return (
    <motion.figcaption {...props} className={classes} ref={ref}>
      {children ?? 'Title Toast Example'}
    </motion.figcaption>
  );
};

export const ToastTitle = forwardRef(ToastTitleRef);
