import { Accordion as AccordionPrimitive } from 'radix-ui';

export interface AccordionHeaderProps extends Omit<
  React.ComponentPropsWithRef<typeof AccordionPrimitive.Header>,
  'asChild'
> {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
}
