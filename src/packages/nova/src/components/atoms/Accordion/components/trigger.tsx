import { motion } from 'framer-motion';
import type { Ref } from 'react';
import { forwardRef } from 'react';
import type { AccordionTriggerProps } from '../types';
import { StylesTrigger } from '../styles';
import { Icon } from '../../Icon';

const AccordionTriggerRef = (
  props: AccordionTriggerProps,
  ref: Ref<HTMLElement>
) => {
  const { children, icon } = props;
  const { classes } = StylesTrigger(props);
  return (
    <motion.summary {...props} className={classes} ref={ref}>
      <>
        {children}
        <Icon height={10} width={10} icon="chevron-down" {...icon} />
      </>
    </motion.summary>
  );
};

export const AccordionTrigger = forwardRef(AccordionTriggerRef);
