import type { ComponentPropsWithRef } from 'react';
import { Accordion as AccordionPrimitive } from 'radix-ui';

export type CardAccordionItemContentProps = Omit<
  ComponentPropsWithRef<typeof AccordionPrimitive.Content>,
  'asChild'
>;
