import { BackgroundColorProps } from '../../props/background-color.props';
import { BorderColorProps } from '../../props/border-color.props';
import { BorderRadiusProps } from '../../props/border-radius.props';
import { BorderProps } from '../../props/border.props';
import { ColorProps } from '../../props/color.props';
import { FlexItemProps } from '../../props/flex-item.props';
import { GapProps } from '../../props/gap.props';
import { GridItemProps } from '../../props/grid-item.props';
import { MarginProps } from '../../props/margin.props';
import { PaddingProps } from '../../props/padding.props';
import { PositionProps } from '../../props/position.props';
import { PropDef } from '../../props/prop-def';
import { SizeProps } from '../../props/size.props';
import { SpacingProps } from '../../props/spacing.props';
import { TextAlignProps } from '../../props/text-align.props';
import { TextTransformProps } from '../../props/text-transform.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { Responsive } from '../../types/responsive';

const displayValues = ['none', 'inline-flex', 'flex'] as const;
const directionValues = ['row', 'column', 'row-reverse', 'column-reverse'] as const;
const alignItemsValues = ['start', 'center', 'end', 'baseline', 'stretch'] as const;
const alignContentValues = [
  'start',
  'center',
  'end',
  'stretch',
  'around',
  'between',
  'evenly',
] as const;
const justifyContentValues = ['start', 'center', 'end', 'between', 'around', 'evenly'] as const;
const wrapValues = ['nowrap', 'wrap', 'wrap-reverse'] as const;

export const flexPropDefs = {
  display: { className: 'display', tokens: displayValues, responsive: true },
  direction: { className: 'flex-direction', tokens: directionValues, responsive: true },
  alignItems: { className: 'align-items', tokens: alignItemsValues, responsive: true },
  alignContent: { className: 'align-content', tokens: alignContentValues, responsive: true },
  justifyContent: {
    className: 'justify-content',
    tokens: justifyContentValues,
    responsive: true,
  },
  wrap: { className: 'flex-wrap', tokens: wrapValues, responsive: true },
} satisfies {
  display: PropDef<(typeof displayValues)[number]>;
  direction: PropDef<(typeof directionValues)[number]>;
  alignItems: PropDef<(typeof alignItemsValues)[number]>;
  alignContent: PropDef<(typeof alignContentValues)[number]>;
  justifyContent: PropDef<(typeof justifyContentValues)[number]>;
  wrap: PropDef<(typeof wrapValues)[number]>;
};

interface CommonFlexProps
  extends PositionProps,
    ColorProps,
    BackgroundColorProps,
    PaddingProps,
    MarginProps,
    SizeProps,
    GapProps,
    Pick<SpacingProps, 'spacing'>,
    BorderProps,
    BorderColorProps,
    BorderRadiusProps,
    GridItemProps,
    FlexItemProps,
    TextAlignProps,
    TextTransformProps {
  as?: 'div' | 'span';
  /** Change the default rendered element for the one passed as a child, merging their props and behavior. */
  asChild?: boolean;
  display?: Responsive<(typeof displayValues)[number]>;
  direction?: Responsive<(typeof directionValues)[number]>;
  alignItems?: Responsive<(typeof alignItemsValues)[number]>;
  alignContent?: Responsive<(typeof alignContentValues)[number]>;
  justifyContent?: Responsive<(typeof justifyContentValues)[number]>;
  wrap?: Responsive<(typeof wrapValues)[number]>;
}
type FlexDivProps = { as?: 'div' } & ComponentPropsWithout<'div', RemovedProps>;
type FlexSpanProps = { as: 'span' } & ComponentPropsWithout<'span', RemovedProps>;
export type FlexProps = CommonFlexProps & (FlexSpanProps | FlexDivProps);
