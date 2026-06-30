import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { PropDef } from '../../props/prop-def';
import type { Responsive } from '../../types/responsive';
import type { MarginProps } from '../../props/margin.props';
import { marginPropDefs } from '../../props/margin.props';

const sizes = ['sm', 'md'] as const;

export const segmentedControlPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: true, default: 'sm' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

export type SegmentedControlProps = {
  /**
   * The value of the selected option(s). Use with `onValueChange` for controlled mode.
   */
  value?: string[];
  /**
   * The default selected value in uncontrolled mode.
   */
  defaultValue?: string[];
  /**
   * Callback fired when the selected value changes.
   */
  onValueChange?: (value: string[]) => void;
  /**
   * When true, multiple options can be selected simultaneously.
   * @default false
   */
  multiple?: boolean;
  /**
   * Disables all options in the control.
   */
  disabled?: boolean;
  /**
   * Whether keyboard focus loops from the last item back to the first.
   * @default true
   */
  loopFocus?: boolean;
  /**
   * The layout direction of the options.
   * @default horizontal
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Sets the height of the control.
   * @default sm
   */
  size?: Responsive<(typeof sizes)[number]>;
  children?: ReactNode;
} & Omit<ComponentPropsWithRef<'div'>, 'onChange'> &
  MarginProps;

export { marginPropDefs };
