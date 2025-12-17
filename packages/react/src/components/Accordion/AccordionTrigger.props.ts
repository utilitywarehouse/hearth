import { Accordion as AccordionPrimitive } from 'radix-ui';

export type AccordionTriggerProps = Omit<
  React.ComponentPropsWithRef<typeof AccordionPrimitive.Trigger>,
  'asChild'
>;
