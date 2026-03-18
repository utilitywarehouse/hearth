import type { ComponentPropsWithRef } from 'react';
import { Accordion as CardAccordionPrimitive } from 'radix-ui';
import { MarginProps } from '../../props/margin.props';

export interface CardAccordionProps
  extends
    Omit<
      ComponentPropsWithRef<typeof CardAccordionPrimitive.Root>,
      | 'orientation'
      | 'asChild'
      | 'dir'
      | 'type'
      | 'defaultValue'
      | 'onValueChange'
      | 'value'
      | 'collapsible'
      | 'disabled'
    >,
    MarginProps {
  value?: CardAccordionPrimitive.AccordionSingleProps['value'];
  onValueChange?: CardAccordionPrimitive.AccordionSingleProps['onValueChange'];
}
