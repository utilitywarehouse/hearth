import { Accordion as RadixAccordion } from 'radix-ui';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export type AccordionItemProps = ComponentPropsWithout<typeof RadixAccordion.Item, RemovedProps> & {
  title?: string;
  description?: string;
  /**
   * @default h3
   */
  headingElement?: 'h1' | 'h2' | 'h3' | 'h4';
};
