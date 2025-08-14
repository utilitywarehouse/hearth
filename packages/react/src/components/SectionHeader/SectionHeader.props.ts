import { MarginProps } from '../../props/margin.props';
import { PropDef } from '../../props/prop-def';
import { TextAlignProps } from '../../props/text-align.props';
import { TextTransformProps } from '../../props/text-transform.props';
import { TextWrapProps } from '../../props/text-wrap.props';
import type { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { LinkProps } from '../Link/Link.props';

const sizes = ['sm', 'md', 'lg', 'xl'] as const;

export const sectionHeaderPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: false, default: 'md' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

export interface SectionHeaderProps
  extends ComponentPropsWithout<'h2', RemovedProps>,
    TextAlignProps,
    TextTransformProps,
    TextWrapProps,
    MarginProps {
  /**
   * Actual string to display as section header
   */
  heading?: string;
  /**
   * @default h2
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  /**
   * Set the text size styles.
   * @default md
   */
  size?: (typeof sizes)[number];
  /**
   * Optional helper text to provide additional context or instructions.
   */
  helperText?: string;
  /**
   * Optional configuration of link at the side.
   * Both need to be present for the link to appear.
   */
  linkText?: string;
  linkHref?: LinkProps['href'];
  /** Inverts the component colours, for use on darker surface colours. */
  inverted?: boolean;
}
