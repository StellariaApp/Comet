import { motion } from 'framer-motion';
import type { Ref } from 'react';
import { forwardRef } from 'react';
import { StylesItem } from '../styles';
import type { AccordionItemProps } from '../types';

const AccordionItemRef = (
  props: AccordionItemProps,
  ref: Ref<HTMLDetailsElement>
) => {
  const { children } = props;
  const { classes } = StylesItem(props);
  return (
    <motion.details {...props} className={classes} ref={ref}>
      {children}
    </motion.details>
  );
};

export const AccordionItem = forwardRef(AccordionItemRef);
