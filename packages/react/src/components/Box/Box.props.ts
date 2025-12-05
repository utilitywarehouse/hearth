import { ComponentPropsWithRef } from 'react';
import { BackgroundColorProps } from '../../props/background-color.props';
import { BorderColorProps } from '../../props/border-color.props';
import { BorderRadiusProps } from '../../props/border-radius.props';
import { BorderProps } from '../../props/border.props';
import { ColorProps } from '../../props/color.props';
import { FlexItemProps } from '../../props/flex-item.props';
import { GridItemProps } from '../../props/grid-item.props';
import { MarginProps } from '../../props/margin.props';
import { PaddingProps } from '../../props/padding.props';
import { PositionProps } from '../../props/position.props';
import { PropDef } from '../../props/prop-def';
import { SizeProps } from '../../props/size.props';
import { TextAlignProps } from '../../props/text-align.props';
import { TextTransformProps } from '../../props/text-transform.props';
import { Responsive } from '../../types/responsive';

const displayValues = ['none', 'inline', 'inline-block', 'block'] as const;

export const boxPropDefs = {
  display: { className: 'display', tokens: displayValues, responsive: true },
} satisfies {
  display: PropDef<(typeof displayValues)[number]>;
};

interface CommonBoxProps
  extends PositionProps,
    ColorProps,
    BackgroundColorProps,
    PaddingProps,
    MarginProps,
    SizeProps,
    BorderProps,
    BorderColorProps,
    BorderRadiusProps,
    GridItemProps,
    FlexItemProps,
    TextAlignProps,
    TextTransformProps {
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
type BoxDivProps = { as?: 'div' } & ComponentPropsWithRef<'div'>;
type BoxSpanProps = { as: 'span' } & ComponentPropsWithRef<'span'>;
export type BoxProps = CommonBoxProps & (BoxSpanProps | BoxDivProps);
