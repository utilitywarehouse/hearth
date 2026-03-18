import { ComponentPropsWithRef } from 'react';
import { PropDef } from '../../props/prop-def';
import { MarginProps } from '../../props/margin.props';
import { Responsive } from '../../types/responsive';

const sizes = ['sm', 'md', 'lg', 'xl', '2xl'] as const;

export const skeletonHeadingPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: false, default: 'md' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

export interface SkeletonHeadingProps
  extends Omit<ComponentPropsWithRef<'h2'>, 'children'>, MarginProps {
  /**
   * Set the size to match Heading size.
   * @default md
   */
  size?: Responsive<(typeof sizes)[number]>;
}
