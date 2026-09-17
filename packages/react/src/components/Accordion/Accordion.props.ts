import type { ComponentPropsWithRef } from 'react';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import { SectionHeaderProps } from '../SectionHeader/SectionHeader.props';
import { MarginProps } from '../../props/margin.props';

export interface AccordionProps
  extends
    Omit<ComponentPropsWithRef<typeof AccordionPrimitive.Root>, 'orientation' | 'asChild' | 'dir'>,
    Omit<SectionHeaderProps, 'headingElement' | 'defaultValue'>,
    MarginProps {
  /**
   * The heading element to render for the `heading` prop.
   * @default 'h2'
   */
  headingElement?: 'h1' | 'h2' | 'h3' | 'h4';
  /** When `type` is `single`, allows an expanded item to be collapsed, closing all items. */
  collapsible?: AccordionPrimitive.AccordionSingleProps['collapsible'];
}
