import { MarginProps } from '../../props/margin.props';
import { PropDef } from '../../props/prop-def';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { Responsive } from '../../types/responsive';

const sizes = ['sm', 'md', 'lg'] as const;
const variants = ['emphasis', 'subtle'] as const;

export const iconContainerPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: true, default: 'md' },
  variant: { className: 'variant', tokens: variants, responsive: false, default: 'subtle' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
};

export interface IconContainerProps
  extends ComponentPropsWithout<'span', RemovedProps>,
    MarginProps {
  /**
   * Sets the container size.
   * @default md
   */
  size?: Responsive<(typeof sizes)[number]>;
  /**
   * Sets the container's visual variant
   * @default subtle
   */
  variant?: (typeof variants)[number];
  /**
   * Sets the colour scheme.
   * @default pig
   */
  colorScheme?: 'energy' | 'mobile' | 'broadband' | 'insurance' | 'cashback' | 'pig' | 'highlight';
  /**
   * Removes the container radius
   * @default false
   */
  radiusNone?: boolean;
  /**
   * Fill the container, rather than having a constrained size
   * @default false
   */
  fill?: boolean;
}
