import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import type { Ref } from 'react';
import { getIcon } from '../../../utils/icons';
import type { IconProps } from './types';
import { Styles } from './styles';

const IconRef = (props: IconProps, ref: Ref<SVGSVGElement>) => {
  const { children, variant = 'solid', icon = 'trash-can' } = props;

  const { classes } = Styles(props);

  const { viewBox, paths } = getIcon(variant, icon);

  return (
    <motion.svg
      height={12}
      ref={ref}
      viewBox={viewBox}
      width={12}
      {...props}
      className={classes}
    >
      {paths}
      {children}
    </motion.svg>
  );
};

export const Icon = forwardRef(IconRef);

export type * from './types';
