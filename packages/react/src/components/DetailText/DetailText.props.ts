import { MarginProps } from '../../props/margin.props';
import { PropDef } from '../../props/prop-def';
import { TextAlignProps } from '../../props/text-align.props';
import { TextTransformProps } from '../../props/text-transform.props';
import { TextWrapProps } from '../../props/text-wrap.props';
import type { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import type { Responsive } from '../../types/responsive';

const sizes = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const;
const colorValues = ['text', 'valid', 'invalid'] as const;

export const detailTextPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: true, default: 'md' },
  color: { className: 'color', tokens: colorValues, responsive: false, default: 'text' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  color: PropDef<(typeof colorValues)[number]>;
};

interface CommonDetailTextProps
  extends TextAlignProps,
    TextTransformProps,
    TextWrapProps,
    MarginProps {
  /**
   * @default span
   */
  as?: 'p' | 'div' | 'span';
  /** Change the default rendered element for the one passed as a child, merging their props and behavior. */
  asChild?: boolean;
  /**
   * Set the text size styles.
   * @default md
   */
  size?: Responsive<(typeof sizes)[number]>;
  /**
   * Set the text color
   * @default text
   */
  color?: Responsive<(typeof colorValues)[number]>;
  /** Inverts the component colours, for use on darker surface colours. */
  inverted?: boolean;
}
type DetailTextDivProps = { as: 'div' } & ComponentPropsWithout<'div', RemovedProps>;
type DetailTextSpanProps = { as: 'span' } & ComponentPropsWithout<'span', RemovedProps>;
type DetailTextPProps = { as?: 'p' } & ComponentPropsWithout<'p', RemovedProps>;
export type DetailTextProps = CommonDetailTextProps &
  (DetailTextSpanProps | DetailTextDivProps | DetailTextPProps);
