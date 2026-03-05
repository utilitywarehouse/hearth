import type { ComponentPropsWithRef } from 'react';
import { Accordion as AccordionPrimitive } from 'radix-ui';

export type AccordionTriggerProps = Omit<
  ComponentPropsWithRef<typeof AccordionPrimitive.Trigger>,
  'asChild'
>;
