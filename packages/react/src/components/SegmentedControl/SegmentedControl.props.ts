import type { ComponentPropsWithRef } from 'react';
import type { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group';
import type { PropDef } from '../../props/prop-def';
import type { Responsive } from '../../types/responsive';
import type { MarginProps } from '../../props/margin.props';

const sizes = ['sm', 'md'] as const;

export const segmentedControlPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: true, default: 'sm' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

// ToggleGroup.Props extends BaseUIComponentProps<'div'> which adds Base UI-specific surface
// (render, className/style as state callbacks, preventBaseUIHandler on event handlers). We Pick
// only the props we want to expose rather than extending the full primitive type, and keep the
// underlying HTML element props via ComponentPropsWithRef<'div'>.
export type SegmentedControlProps = Pick<
  ToggleGroupPrimitive.Props,
  'value' | 'defaultValue' | 'onValueChange' | 'disabled' | 'children'
> & {
  /**
   * Sets the height of the control. `sm` is 32px and `md` is 48px.
   * Accepts a responsive value to display different sizes at different breakpoints.
   * @default sm
   */
  size?: Responsive<(typeof sizes)[number]>;
} & Omit<ComponentPropsWithRef<'div'>, 'onChange'> &
  MarginProps;
