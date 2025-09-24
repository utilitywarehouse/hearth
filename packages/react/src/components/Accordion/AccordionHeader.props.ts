import { Accordion as RadixAccordion } from 'radix-ui';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export type AccordionHeaderProps = ComponentPropsWithout<
  typeof RadixAccordion.Header,
  RemovedProps
> & {
  /**
   * @default h3
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4';
};
