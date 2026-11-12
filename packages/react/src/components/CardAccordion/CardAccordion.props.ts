import type { ComponentPropsWithRef, CSSProperties } from 'react';
import { Accordion as CardAccordionPrimitive } from '@base-ui/react/accordion';
import { MarginProps } from '../../props/margin.props';

export interface CardAccordionProps
  extends
    Omit<
      ComponentPropsWithRef<typeof CardAccordionPrimitive.Root<string>>,
      | 'orientation'
      | 'render'
      | 'dir'
      | 'className'
      | 'style'
      | 'multiple'
      | 'defaultValue'
      | 'onValueChange'
      | 'value'
      | 'disabled'
      | 'hiddenUntilFound'
      | 'keepMounted'
      | 'loopFocus'
    >,
    MarginProps {
  className?: string;
  style?: CSSProperties;
  /** The `value` of the currently active (expanded) `CardAccordionItem`, for controlled usage. */
  value?: ComponentPropsWithRef<typeof CardAccordionPrimitive.Root<string>>['value'];
  /** Called with the new `value` when the active step changes. */
  onValueChange?: (
    value: NonNullable<ComponentPropsWithRef<typeof CardAccordionPrimitive.Root<string>>['value']>
  ) => void;
}
