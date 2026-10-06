import type { ComponentPropsWithRef } from 'react';
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';
import { SectionHeaderProps } from '../SectionHeader/SectionHeader.props';
import { MarginProps } from '../../props/margin.props';

export type AccordionProps = Omit<
  ComponentPropsWithRef<typeof AccordionPrimitive.Root<string>>,
  'orientation' | 'render' | 'dir' | 'className' | 'style'
> &
  Omit<SectionHeaderProps, 'headingElement' | 'defaultValue'> &
  MarginProps & {
  /**
   * The heading element to render for the `heading` prop.
   * @default 'h2'
   */
    headingElement?: 'h1' | 'h2' | 'h3' | 'h4';
  /** When `type` is `single`, allows an expanded item to be collapsed, closing all items. */
  };
