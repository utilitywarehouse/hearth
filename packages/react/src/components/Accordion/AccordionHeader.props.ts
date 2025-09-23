import { Accordion as RadixAccordion } from 'radix-ui';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export type AccordionHeaderProps = ComponentPropsWithout<
  typeof RadixAccordion.Header,
  RemovedProps
> & {};
