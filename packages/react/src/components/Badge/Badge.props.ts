import { PropDef } from '../../props/prop-def';
import { TextTransformProps } from '../../props/text-transform.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { Responsive } from '../../types/responsive';

const variants = ['solid', 'outline'] as const;
const sizes = ['sm', 'md'] as const;

export const badgePropDefs = {
  variant: { className: 'variant', tokens: variants, responsive: false, default: 'solid' },
  size: { className: 'size', tokens: sizes, responsive: true, default: 'md' },
} satisfies {
  variant: PropDef<(typeof variants)[number]>;
  size: PropDef<(typeof sizes)[number]>;
};

export interface BadgeProps
  extends ComponentPropsWithout<'span', RemovedProps>,
    TextTransformProps {
  /**
   * Sets the badges's visual variant
   * @default solid
   */
  variant?: (typeof variants)[number];
  /**
   * Sets the badge size.
   * @default md
   */
  size?: Responsive<(typeof sizes)[number]>;
  /**
   * Sets the colour scheme.
   * @default info
   */
  colorScheme?: 'info' | 'positive' | 'danger' | 'warning' | 'functional';
  /**
   * Removes the bottom radius, set when the Badge sits directly above another container
   * @default false
   */
  flatBase?: boolean;
}
