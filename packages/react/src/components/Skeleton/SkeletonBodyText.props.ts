import type { ComponentPropsWithRef } from 'react';
import type { MarginProps } from '../../props/margin.props';
import type { PropDef } from '../../props/prop-def';
import type { Responsive } from '../../types/responsive';
import { SizeProps } from '../../props/size.props';

const sizes = ['sm', 'md', 'lg'] as const;

export const skeletonBodyTextPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: true, default: 'md' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

export interface SkeletonBodyTextProps
  extends
    Omit<ComponentPropsWithRef<'div'>, 'children' | 'color'>,
    MarginProps,
    Pick<SizeProps, 'width' | 'maxWidth' | 'minWidth'> {
  /**
   * Set the size to match BodyText size.
   * @default md
   */
  size?: Responsive<(typeof sizes)[number]>;
  /**
   * Number of skeleton lines to render.
   * @default 1
   */
  lines?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
}
