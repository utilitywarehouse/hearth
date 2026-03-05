import type { ComponentPropsWithRef } from 'react';
import { Accordion as AccordionPrimitive } from 'radix-ui';

export interface AccordionItemProps extends Omit<
  ComponentPropsWithRef<typeof AccordionPrimitive.Item>,
  'asChild'
> {
  title?: string;
  description?: string;
  headingElement?: 'h1' | 'h2' | 'h3' | 'h4';
}
