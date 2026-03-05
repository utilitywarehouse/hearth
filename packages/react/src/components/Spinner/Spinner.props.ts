import type { ComponentPropsWithRef } from 'react';
import { MarginProps } from '../../props/margin.props';
import { PropDef } from '../../props/prop-def';
import { Responsive } from '../../types/responsive';

const sizes = ['xs', 'sm', 'md', 'lg'] as const;
const colors = ['primary', 'secondary', 'brand', 'inverted'] as const;

export const spinnerPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: true, default: 'md' },
  color: { className: 'color', tokens: colors, responsive: false },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  color: PropDef<(typeof colors)[number]>;
};

export interface SpinnerProps extends ComponentPropsWithRef<'div'>, MarginProps {
  /**
   * Sets the button height.
   * @default md
   */
  size?: Responsive<(typeof sizes)[number]>;
  /**
   * Sets the fill color.
   */
  color?: (typeof colors)[number];
  /**
   * Sets the Spinner stroke colour to `currentColor`.
   * For use when the Spinner needs to inherit a parent component's colour scheme.
   */
  currentColor?: boolean;
}
