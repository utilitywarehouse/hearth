import { AlignContentProps } from '../../props/align-content.props';
import { AlignSelfProps } from '../../props/align-self.props';
import { AlignItemsProps } from '../../props/align-items.props';
import { BackgroundColorProps } from '../../props/background-color.props';
import { BorderColorProps } from '../../props/border-color.props';
import { BorderRadiusProps } from '../../props/border-radius.props';
import { BorderStyleProps } from '../../props/border-style.props';
import { BorderWidthProps } from '../../props/border-width.props';
import { ColorProps } from '../../props/color.props';
import { FlexItemProps } from '../../props/flex-item.props';
import { GapProps } from '../../props/gap.props';
import { GridItemProps } from '../../props/grid-item.props';
import { JustifyContentProps } from '../../props/justify-content.props';
import { MarginProps } from '../../props/margin.props';
import { OpacityProps } from '../../props/opacity.props';
import { OrderProps } from '../../props/order.props';
import { OverflowProps } from '../../props/overflow.props';
import { PaddingProps } from '../../props/padding.props';
import { PositionProps } from '../../props/position.props';
import { PropDef } from '../../props/prop-def';
import { SizeProps } from '../../props/size.props';
import { SpacingProps } from '../../props/spacing.props';
import { TextAlignProps } from '../../props/text-align.props';
import { TextTransformProps } from '../../props/text-transform.props';
import { ZIndexProps } from '../../props/z-index.props';
import { Responsive } from '../../types/responsive';
import type { ComponentPropsWithRef } from 'react';

const displayValues = ['none', 'inline-flex', 'flex'] as const;
const directionValues = ['row', 'column', 'row-reverse', 'column-reverse'] as const;
const wrapValues = ['nowrap', 'wrap', 'wrap-reverse'] as const;

export const flexPropDefs = {
  /**
   * Sets the CSS `display` property to a flex value. Can be set responsively.
   */
  display: { className: 'd', tokens: displayValues, responsive: true },
  /**
   * Sets the direction of the flex container's main axis. Can be set responsively.
   *
   * @default 'row'
   */
  direction: { className: 'flex-d', tokens: directionValues, responsive: true },
  /**
   * Sets whether flex items wrap onto multiple lines. Can be set responsively.
   *
   * @default 'nowrap'
   */
  wrap: { className: 'flex-w', tokens: wrapValues, responsive: true },
} satisfies {
  display: PropDef<(typeof displayValues)[number]>;
  direction: PropDef<(typeof directionValues)[number]>;
  wrap: PropDef<(typeof wrapValues)[number]>;
};

export interface CommonFlexProps
  extends
    AlignContentProps,
    AlignItemsProps,
    AlignSelfProps,
    BackgroundColorProps,
    BorderColorProps,
    BorderRadiusProps,
    BorderStyleProps,
    BorderWidthProps,
    ColorProps,
    FlexItemProps,
    GapProps,
    GridItemProps,
    JustifyContentProps,
    MarginProps,
    OpacityProps,
    OrderProps,
    OverflowProps,
    PaddingProps,
    Pick<SpacingProps, 'spacing'>,
    PositionProps,
    SizeProps,
    TextAlignProps,
    TextTransformProps,
    ZIndexProps {
  /**
   * Merges the component's props onto its immediate child instead of
   * rendering its own DOM element, so the child determines the rendered tag.
   *
   * @default false
   */
  asChild?: boolean;
  /**
   * Sets the CSS `display` property to a flex value. Can be set responsively.
   */
  display?: Responsive<(typeof displayValues)[number]>;
  /**
   * Sets the direction of the flex container's main axis. Can be set responsively.
   * @default row
   */
  direction?: Responsive<(typeof directionValues)[number]>;
  /**
   * Sets whether flex items wrap onto multiple lines. Can be set responsively.
   * @default nowrap
   */
  wrap?: Responsive<(typeof wrapValues)[number]>;
}
type FlexDivProps = {
  /** Renders a `div` element. This is the default. */
  as?: 'div';
} & ComponentPropsWithRef<'div'>;
type FlexSpanProps = {
  /** Renders a `span` element. */
  as?: 'span';
} & ComponentPropsWithRef<'span'>;
export type FlexProps = CommonFlexProps & (FlexDivProps | FlexSpanProps);
