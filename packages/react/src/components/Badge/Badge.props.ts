import { PropDef } from '../../props/prop-def';
import { TextTransformProps } from '../../props/text-transform.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { Responsive } from '../../types/responsive';

const variants = ['emphasis', 'subtle', 'outline'] as const;
const sizes = ['sm', 'md'] as const;

export const badgePropDefs = {
  variant: { className: 'variant', tokens: variants, responsive: false, default: 'subtle' },
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
   * @default subtle
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
  colorScheme?:
    | 'info'
    | 'positive'
    | 'danger'
    | 'warning'
    | 'functional'
    | 'energy'
    | 'mobile'
    | 'broadband'
    | 'insurance'
    | 'cashback'
    | 'pig'
    | 'highlight';
  /**
   * Removes the bottom radius, set when the Badge sits directly above another container
   * @default false
   */
  flatBase?: boolean;
}
