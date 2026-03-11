import { ComponentPropsWithRef } from 'react';
import { AlignSelfProps } from '../../props/align-self.props';
import { BackgroundColorProps } from '../../props/background-color.props';
import { BorderColorProps } from '../../props/border-color.props';
import { BorderRadiusProps } from '../../props/border-radius.props';
import { BorderStyleProps } from '../../props/border-style.props';
import { BorderWidthProps } from '../../props/border-width.props';
import { ColorProps } from '../../props/color.props';
import { FlexItemProps } from '../../props/flex-item.props';
import { GridItemProps } from '../../props/grid-item.props';
import { MarginProps } from '../../props/margin.props';
import { OpacityProps } from '../../props/opacity.props';
import { OverflowProps } from '../../props/overflow.props';
import { PaddingProps } from '../../props/padding.props';
import { PositionProps } from '../../props/position.props';
import { PropDef } from '../../props/prop-def';
import { OrderProps } from '../../props/order.props';
import { SizeProps } from '../../props/size.props';
import { TextAlignProps } from '../../props/text-align.props';
import { TextTransformProps } from '../../props/text-transform.props';
import { ZIndexProps } from '../../props/z-index.props';
import { Responsive } from '../../types/responsive';

const displayValues = ['none', 'inline', 'inline-block', 'block'] as const;

export const boxPropDefs = {
  display: { className: 'd', tokens: displayValues, responsive: true },
} satisfies {
  display: PropDef<(typeof displayValues)[number]>;
};

export interface CommonBoxProps
  extends
    AlignSelfProps,
    BackgroundColorProps,
    BorderColorProps,
    BorderRadiusProps,
    BorderStyleProps,
    BorderWidthProps,
    ColorProps,
    FlexItemProps,
    GridItemProps,
    MarginProps,
    OpacityProps,
    OrderProps,
    OverflowProps,
    PaddingProps,
    PositionProps,
    SizeProps,
    TextAlignProps,
    TextTransformProps,
    ZIndexProps {
  asChild?: boolean;
  display?: Responsive<(typeof displayValues)[number]>;
}
type BoxDivProps = { as?: 'div' } & ComponentPropsWithRef<'div'>;
type BoxSpanProps = { as: 'span' } & ComponentPropsWithRef<'span'>;
export type BoxProps = CommonBoxProps & (BoxSpanProps | BoxDivProps);
