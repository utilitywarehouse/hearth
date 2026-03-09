import type { ComponentPropsWithRef } from 'react';
import { Accordion as CardAccordionPrimitive } from 'radix-ui';

export interface CardAccordionHeaderProps extends Omit<
  ComponentPropsWithRef<typeof CardAccordionPrimitive.Header>,
  'asChild'
> {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
}
