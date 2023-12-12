import type { HTMLMotionProps } from 'framer-motion';
import type { CSSProperties } from '../../../types/css';
import type { IconProps } from '../Icon';

export type AccordionContainerProps = HTMLMotionProps<'section'> &
  CSSProperties & {
    autoHide?: boolean;
    rotateIcon?: boolean;
  };
export type AccordionItemProps = HTMLMotionProps<'details'> & CSSProperties;
export type AccordionTriggerProps = HTMLMotionProps<'summary'> &
  CSSProperties & {
    icon?: IconProps;
  };
export type AccordionContentProps = HTMLMotionProps<'p'> & CSSProperties;

export type ItemAccordion = {
  id: string;
  title: string;
  icon?: IconProps['icon'];
  content?: string;
  open?: boolean;
};

type ItemsAccordion = ItemAccordion[];

export type AccordionProps = {
  rotateIcon?: boolean;
  autoHide?: boolean;
  items?: ItemsAccordion;
  components?: {
    container?: AccordionContainerProps;
    item?: AccordionItemProps;
    icon?: IconProps;
    trigger?: AccordionTriggerProps;
    content?: AccordionContentProps;
  };
};
