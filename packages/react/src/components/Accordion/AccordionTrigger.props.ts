import { Accordion as RadixAccordion } from 'radix-ui';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export type AccordionTriggerProps = ComponentPropsWithout<
  typeof RadixAccordion.Trigger,
  RemovedProps
> &
  ComponentPropsWithout<typeof RadixAccordion.Header, RemovedProps> & {};
