import { motion } from 'framer-motion';
import type { Ref } from 'react';
import { forwardRef } from 'react';
import type { ToastContainerProps } from '../types';
import { StylesContainer } from '../styles';

const ToastContainerRef = (
  props: ToastContainerProps,
  ref: Ref<HTMLElement>
) => {
  const { children } = props;

  const { classes } = StylesContainer(props);

  return (
    <motion.figure {...props} className={classes} ref={ref}>
      {children}
    </motion.figure>
  );
};

export const ToastContainer = forwardRef(ToastContainerRef);
