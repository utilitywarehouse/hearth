import type { ComponentPropsWithRef } from 'react';
import { Accordion as AccordionPrimitive } from 'radix-ui';

export type AccordionContentProps = Omit<
  ComponentPropsWithRef<typeof AccordionPrimitive.Content>,
  'asChild'
>;
