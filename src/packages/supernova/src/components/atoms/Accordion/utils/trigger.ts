import type {
  AccordionProps,
  AccordionTriggerProps,
  ItemAccordion
} from '../types';

export const CreateTrigger = (
  accordion: AccordionProps,
  item: ItemAccordion
) => {
  const { components } = accordion;
  const trigger = {
    ...components?.trigger,
    icon: {
      ...components?.trigger?.icon,
      icon: item.icon ?? 'chevron-down',
      ...components?.icon
    }
  };
  return trigger as AccordionTriggerProps;
};
