import type { ComponentPropsWithRef } from 'react';
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';

export interface AccordionItemProps extends Omit<
  ComponentPropsWithRef<typeof AccordionPrimitive.Item>,
  'render' | 'className'
> {
  className?: string;
  title?: string;
  description?: string;
  headingElement?: 'h1' | 'h2' | 'h3' | 'h4';
}
