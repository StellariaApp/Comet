import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import type { Ref } from 'react';
import Animations from '../../../animations';
import type { WrapperProps } from './types';
import { Styles } from './styles';

const WrapperRef = (props: WrapperProps, ref: Ref<HTMLDivElement>) => {
  const { children } = props;

  const { classes } = Styles(props);

  return (
    <motion.div
      {...Animations.Fade.InOut}
      {...props}
      className={classes}
      ref={ref}
    >
      {children}
    </motion.div>
  );
};

export const Wrapper = forwardRef(WrapperRef);

export type * from './types';
