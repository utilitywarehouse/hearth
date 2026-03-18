import { ComponentPropsWithRef } from 'react';
import { MarginProps } from '../../props/margin.props';
import { PropDef } from '../../props/prop-def';
import type { BodyTextProps } from '../BodyText/BodyText.props';
import { Responsive } from '../../types/responsive';

const sizes = ['sm', 'md', 'lg'] as const;

export const skeletonBodyTextPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: true, default: 'md' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

export interface SkeletonBodyTextProps
  extends Omit<ComponentPropsWithRef<'div'>, 'children'>, Pick<BodyTextProps, 'size'>, MarginProps {
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
