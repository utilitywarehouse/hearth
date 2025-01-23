import { PropDef } from '../../props/prop-def';
import { TextAlignProps } from '../../props/text-align.props';
import type { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import type { Responsive } from '../../types/responsive';

const sizes = ['sm', 'md', 'lg'] as const;
const weights = ['regular', 'bold'] as const;

export const bodyTextPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: true, default: 'md' },
  weight: { className: 'weight', tokens: weights, responsive: true, default: 'regular' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  weight: PropDef<(typeof weights)[number]>;
};

interface CommonBodyTextProps extends TextAlignProps {
  /**
   * @default p
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
   * Set the font-weight
   * @default regular
   */
  weight?: Responsive<(typeof weights)[number]>;
  /**
   * If true, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   * Note that text overflow can only happen with block or inline-block level elements (the element needs to have a width in order to overflow).
   */
  truncate?: boolean | undefined;
}
type BodyTextDivProps = { as: 'div' } & ComponentPropsWithout<'div', RemovedProps>;
type BodyTextSpanProps = { as: 'span' } & ComponentPropsWithout<'span', RemovedProps>;
type BodyTextPProps = { as?: 'p' } & ComponentPropsWithout<'p', RemovedProps>;
export type BodyTextProps = CommonBodyTextProps &
  (BodyTextSpanProps | BodyTextDivProps | BodyTextPProps);
