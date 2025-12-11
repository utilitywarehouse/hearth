import { MarginProps } from '../../props/margin.props';
import { PropDef } from '../../props/prop-def';
import { Responsive } from '../../types/responsive';

const sizes = ['sm', 'md', 'lg'] as const;
const variants = ['emphasis', 'subtle'] as const;
const borderRadiusValues = ['none', 'inherit'] as const;

export const iconContainerPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: true, default: 'md' },
  variant: { className: 'variant', tokens: variants, responsive: false, default: 'subtle' },
  borderRadius: { className: 'border-radius', tokens: borderRadiusValues, responsive: true },
  borderTopLeftRadius: {
    className: 'border-top-left-radius',
    tokens: borderRadiusValues,
    responsive: true,
  },
  borderTopRightRadius: {
    className: 'border-top-right-radius',
    tokens: borderRadiusValues,
    responsive: true,
  },
  borderBottomRightRadius: {
    className: 'border-bottom-right-radius',
    tokens: borderRadiusValues,
    responsive: true,
  },
  borderBottomLeftRadius: {
    className: 'border-bottom-left-radius',
    tokens: borderRadiusValues,
    responsive: true,
  },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  borderRadius: PropDef<(typeof borderRadiusValues)[number]>;
  borderTopLeftRadius: PropDef<(typeof borderRadiusValues)[number]>;
  borderTopRightRadius: PropDef<(typeof borderRadiusValues)[number]>;
  borderBottomRightRadius: PropDef<(typeof borderRadiusValues)[number]>;
  borderBottomLeftRadius: PropDef<(typeof borderRadiusValues)[number]>;
};

export interface IconContainerProps extends React.ComponentPropsWithRef<'span'>, MarginProps {
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
   * Fill the container height, width or both, rather than having a constrained size
   */
  fill?: 'height' | 'width' | 'both';
  /* Set the border radius. */
  borderRadius?: Responsive<(typeof borderRadiusValues)[number]>;
  /* Set the border-top-left radius. */
  borderTopLeftRadius?: Responsive<(typeof borderRadiusValues)[number]>;
  /* Set the border-top-right radius. */
  borderTopRightRadius?: Responsive<(typeof borderRadiusValues)[number]>;
  /* Set the border-bottom-right radius. */
  borderBottomRightRadius?: Responsive<(typeof borderRadiusValues)[number]>;
  /* Set the border-bottom-left radius. */
  borderBottomLeftRadius?: Responsive<(typeof borderRadiusValues)[number]>;
}
