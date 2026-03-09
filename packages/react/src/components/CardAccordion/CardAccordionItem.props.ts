import type { ComponentPropsWithRef } from 'react';
import { Accordion as CardAccordionPrimitive } from 'radix-ui';

export interface CardAccordionItemProps extends Omit<
  ComponentPropsWithRef<typeof CardAccordionPrimitive.Item>,
  'asChild'
> {
  title?: string;
  description?: string;
  headingElement?: 'h1' | 'h2' | 'h3' | 'h4';
}
