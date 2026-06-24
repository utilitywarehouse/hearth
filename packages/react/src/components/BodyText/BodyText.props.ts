import { ComponentPropsWithRef } from 'react';
import { ColorProps } from '../../props/color.props';
import { MarginProps } from '../../props/margin.props';
import { PropDef } from '../../props/prop-def';
import { TextAlignProps } from '../../props/text-align.props';
import { TextTransformProps } from '../../props/text-transform.props';
import { TextWrapProps } from '../../props/text-wrap.props';
import type { Responsive } from '../../types/responsive';

const sizes = ['sm', 'md', 'lg', 'xl'] as const;
const weights = ['regular', 'semibold', 'bold'] as const;

export const bodyTextPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: true, default: 'md' },
  weight: { className: 'fw', tokens: weights, responsive: true },
  paragraphSpacing: { className: 'paragraph-spacing', responsive: false },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  weight: PropDef<(typeof weights)[number]>;
  paragraphSpacing: PropDef<boolean>;
};

export interface CommonBodyTextProps
  extends ColorProps, TextAlignProps, TextTransformProps, TextWrapProps, MarginProps {
  /**
   * Shorthand for changing the default rendered element into a semantically appropriate alternative.
   * Cannot be used in combination with `asChild`.
   * @default p
   */
  as?: 'p' | 'div' | 'span' | 'label';
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
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
  /**
   * If true, the text will have a bottom margin.
   */
  paragraphSpacing?: boolean;
}
type BodyTextDivProps = { as?: 'div' } & ComponentPropsWithRef<'div'>;
type BodyTextSpanProps = { as?: 'span' } & ComponentPropsWithRef<'span'>;
type BodyTextPProps = { as?: 'p' } & ComponentPropsWithRef<'p'>;
type BodyTextLabelProps = { as?: 'label' } & ComponentPropsWithRef<'label'>;
export type BodyTextProps = CommonBodyTextProps &
  (BodyTextSpanProps | BodyTextDivProps | BodyTextPProps | BodyTextLabelProps);
