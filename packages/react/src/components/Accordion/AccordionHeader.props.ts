import type { ComponentPropsWithRef } from 'react';
import { Accordion as AccordionPrimitive } from 'radix-ui';

export interface AccordionHeaderProps extends Omit<
  ComponentPropsWithRef<typeof AccordionPrimitive.Header>,
  'asChild'
> {
  /**
   * Render the appropriate heading level for your page
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4';
}
