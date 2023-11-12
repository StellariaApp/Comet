import { motion } from 'framer-motion';
import type { Ref } from 'react';
import { forwardRef } from 'react';
import { StylesDescription } from '../styles';
import type { ToastDescriptionProps } from '../types';

const ToastDescriptionRef = (
  props: ToastDescriptionProps,
  ref: Ref<HTMLParagraphElement>
) => {
  const { children } = props;
  const { classes } = StylesDescription(props);
  return (
    <motion.p {...props} className={classes} ref={ref}>
      {children ?? 'Description Toast Example'}
    </motion.p>
  );
};

export const ToastDescription = forwardRef(ToastDescriptionRef);
