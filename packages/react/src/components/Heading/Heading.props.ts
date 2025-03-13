import { PropDef } from '../../props/prop-def';
import { TextAlignProps } from '../../props/text-align.props';
import { TextTransformProps } from '../../props/text-transform.props';
import { TextWrapProps } from '../../props/text-wrap.props';
import type { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import type { Responsive } from '../../types/responsive';

const sizes = ['sm', 'md', 'lg', 'xl'] as const;

export const headingPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: false, default: 'md' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

export interface HeadingProps
  extends TextAlignProps,
    TextTransformProps,
    TextWrapProps,
    ComponentPropsWithout<'h2', RemovedProps> {
  /**
   * @default h2
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  /** Change the default rendered element for the one passed as a child, merging their props and behavior. */
  asChild?: boolean;
  /**
   * Set the text size styles.
   * @default md
   */
  size?: (typeof sizes)[number];
  /**
   * Set the text-align on the component.
   */
  align?: Responsive<'left' | 'center' | 'right'>;
  /** Inverts the component colours, for use on darker surface colours. */
  inverted?: boolean;
}
