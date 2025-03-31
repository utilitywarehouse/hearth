import { PropDef } from '../../props/prop-def';
import { TextTransformProps } from '../../props/text-transform.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

const variants = ['solid', 'outline'] as const;

export const badgePropDefs = {
  variant: { className: 'variant', tokens: variants, responsive: false, default: 'solid' },
} satisfies {
  variant: PropDef<(typeof variants)[number]>;
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
   * Sets the colour scheme.
   * @default blue
   */
  colorScheme?: 'blue' | 'green' | 'red' | 'orange' | 'grey';
  /**
   * Removes the bottom radius, set when the Badge sits directly above another container
   * @default false
   */
  flatBase?: boolean;
}
