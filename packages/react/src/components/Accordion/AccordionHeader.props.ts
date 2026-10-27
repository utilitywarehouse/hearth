import type { ComponentPropsWithRef, CSSProperties, ReactNode } from 'react';
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';

export interface AccordionHeaderProps extends Omit<
  ComponentPropsWithRef<typeof AccordionPrimitive.Header>,
  'render' | 'className' | 'children' | 'style'
> {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /**
   * Render the appropriate heading level for your page
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4';
}
