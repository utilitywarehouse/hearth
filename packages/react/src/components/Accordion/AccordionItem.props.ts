import type { ComponentPropsWithRef, CSSProperties, ReactNode } from 'react';
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';

export interface AccordionItemProps extends Omit<
  ComponentPropsWithRef<typeof AccordionPrimitive.Item>,
  'render' | 'className' | 'value' | 'children' | 'style'
> {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /**
   * A unique value that identifies this accordion item. Used to control
   * which item(s) are expanded via `value`/`defaultValue` on `Accordion`.
   */
  value: string;
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
