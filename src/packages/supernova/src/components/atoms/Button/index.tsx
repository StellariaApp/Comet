import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ButtonProps } from './types';
import { Styles } from './styles';

const ButtonRef = (props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
  const { children } = props;

  const { classes } = Styles(props);

  return (
    <motion.button {...props} className={classes} ref={ref}>
      {children}
    </motion.button>
  );
};

export const Button = forwardRef(ButtonRef);

export type * from './types';
