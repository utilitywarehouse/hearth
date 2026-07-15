import type { ComponentPropsWithRef } from 'react';
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';

export interface AccordionHeaderProps extends Omit<
  ComponentPropsWithRef<typeof AccordionPrimitive.Header>,
  'render' | 'className'
> {
  className?: string;
  /**
   * Render the appropriate heading level for your page
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4';
}
