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
  /** The `value` of the currently active (expanded) `CardAccordionItem`, for controlled usage. */
  value?: CardAccordionPrimitive.AccordionSingleProps['value'];
  /** Called with the new `value` when the active step changes. */
  onValueChange?: CardAccordionPrimitive.AccordionSingleProps['onValueChange'];
}
