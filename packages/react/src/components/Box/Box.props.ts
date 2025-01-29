import type { ColorProps } from '../../props/color.props';
import { FlexItemProps } from '../../props/flex-item.props';
import type { GridItemProps } from '../../props/grid-item.props';
import type { MarginProps } from '../../props/margin.props';
import type { PaddingProps } from '../../props/padding.props';
import { PropDef } from '../../props/prop-def';
import type { SizeProps } from '../../props/size.props';
import type { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { Responsive } from '../../types/responsive';

const displayValues = ['none', 'inline', 'inline-block', 'block'] as const;

export const boxPropDefs = {
  display: { className: 'display', tokens: displayValues, responsive: true },
} satisfies {
  display: PropDef<(typeof displayValues)[number]>;
};

interface CommonBoxProps
  extends ColorProps,
    PaddingProps,
    MarginProps,
    SizeProps,
    GridItemProps,
    FlexItemProps {
  /**
   * Shorthand for changing the default rendered element into a semantically appropriate alternative.
   * Cannot be used in combination with `asChild`.
   * @default div
   */
  as?: 'div' | 'span';
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean;
  display?: Responsive<(typeof displayValues)[number]>;
}
type BoxDivProps = { as?: 'div' } & ComponentPropsWithout<'div', RemovedProps>;
type BoxSpanProps = { as: 'span' } & ComponentPropsWithout<'span', RemovedProps>;
export type BoxProps = CommonBoxProps & (BoxSpanProps | BoxDivProps);
