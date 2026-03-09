import type { ComponentPropsWithRef } from 'react';
import { Accordion as CardAccordionPrimitive } from 'radix-ui';
import { SectionHeaderProps } from '../SectionHeader/SectionHeader.props';
import { MarginProps } from '../../props/margin.props';

export interface CardAccordionProps
  extends
    Omit<ComponentPropsWithRef<typeof CardAccordionPrimitive.Root>, 'orientation' | 'asChild' | 'dir'>,
    Omit<SectionHeaderProps, 'headingElement' | 'defaultValue'>,
    MarginProps {
  headingElement?: 'h1' | 'h2' | 'h3' | 'h4';
  collapsible?: CardAccordionPrimitive.AccordionSingleProps['collapsible'];
}
