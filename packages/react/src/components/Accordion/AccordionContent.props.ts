import { Accordion as AccordionPrimitive } from 'radix-ui';

export type AccordionContentProps = Omit<
  React.ComponentPropsWithRef<typeof AccordionPrimitive.Content>,
  'asChild'
>;
