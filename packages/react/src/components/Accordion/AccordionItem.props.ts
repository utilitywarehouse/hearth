import type { ComponentPropsWithRef } from 'react';
import { Accordion as AccordionPrimitive } from 'radix-ui';

export interface AccordionItemProps extends Omit<
  ComponentPropsWithRef<typeof AccordionPrimitive.Item>,
  'asChild'
> {
  /**
   * Shorthand that renders a default `AccordionHeader` + `AccordionTrigger`
   * composition using this as the heading text. Omit to compose the header
   * manually as children instead.
   */
  title?: string;
  /**
   * Helper text shown below the shorthand `title`.
   */
  description?: string;
  /**
   * Sets the semantic heading level used for the shorthand header when
   * `title` is set.
   * @default h3
   */
  headingElement?: 'h1' | 'h2' | 'h3' | 'h4';
}
