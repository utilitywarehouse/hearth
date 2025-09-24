import { Accordion as RadixAccordion } from 'radix-ui';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export type AccordionContentProps = ComponentPropsWithout<
  typeof RadixAccordion.Content,
  RemovedProps
> & {};
