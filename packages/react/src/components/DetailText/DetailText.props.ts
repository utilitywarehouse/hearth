import { PropDef } from '../../props/prop-def';
import { TextAlignProps } from '../../props/text-align.props';
import type { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import type { Responsive } from '../../types/responsive';

export const sizes = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const;

export const detailTextPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: true, default: 'md' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

interface CommonDetailTextProps extends TextAlignProps {
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
}
type DetailTextDivProps = { as: 'div' } & ComponentPropsWithout<'div', RemovedProps>;
type DetailTextSpanProps = { as: 'span' } & ComponentPropsWithout<'span', RemovedProps>;
type DetailTextPProps = { as?: 'p' } & ComponentPropsWithout<'p', RemovedProps>;
export type DetailTextProps = CommonDetailTextProps &
  (DetailTextSpanProps | DetailTextDivProps | DetailTextPProps);
