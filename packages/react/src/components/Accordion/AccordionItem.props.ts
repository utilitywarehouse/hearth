import { Accordion as AccordionPrimitive } from 'radix-ui';

export interface AccordionItemProps
  extends Omit<React.ComponentPropsWithRef<typeof AccordionPrimitive.Item>, 'asChild'> {
  title?: string;
  description?: string;
  headingElement?: 'h1' | 'h2' | 'h3' | 'h4';
}
