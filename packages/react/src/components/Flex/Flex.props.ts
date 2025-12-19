import { AlignContentProps } from '../../props/align-content.props';
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
import { PaddingProps } from '../../props/padding.props';
import { PositionProps } from '../../props/position.props';
import { PropDef } from '../../props/prop-def';
import { SizeProps } from '../../props/size.props';
import { SpacingProps } from '../../props/spacing.props';
import { TextAlignProps } from '../../props/text-align.props';
import { TextTransformProps } from '../../props/text-transform.props';
import { ZIndexProps } from '../../props/z-index.props';
import { Responsive } from '../../types/responsive';

const displayValues = ['none', 'inline-flex', 'flex'] as const;
const directionValues = ['row', 'column', 'row-reverse', 'column-reverse'] as const;
const wrapValues = ['nowrap', 'wrap', 'wrap-reverse'] as const;

export const flexPropDefs = {
  display: { className: 'd', tokens: displayValues, responsive: true },
  direction: { className: 'flex-d', tokens: directionValues, responsive: true },
  wrap: { className: 'flex-w', tokens: wrapValues, responsive: true },
} satisfies {
  display: PropDef<(typeof displayValues)[number]>;
  direction: PropDef<(typeof directionValues)[number]>;
  wrap: PropDef<(typeof wrapValues)[number]>;
};

interface CommonFlexProps
  extends AlignItemsProps,
    AlignContentProps,
    JustifyContentProps,
    PositionProps,
    ColorProps,
    BackgroundColorProps,
    PaddingProps,
    MarginProps,
    SizeProps,
    GapProps,
    Pick<SpacingProps, 'spacing'>,
    BorderStyleProps,
    BorderWidthProps,
    BorderColorProps,
    BorderRadiusProps,
    GridItemProps,
    FlexItemProps,
    TextAlignProps,
    TextTransformProps,
    ZIndexProps {
  asChild?: boolean;
  display?: Responsive<(typeof displayValues)[number]>;
  direction?: Responsive<(typeof directionValues)[number]>;
  wrap?: Responsive<(typeof wrapValues)[number]>;
}
type FlexDivProps = { as?: 'div' } & React.ComponentPropsWithRef<'div'>;
type FlexSpanProps = { as?: 'span' } & React.ComponentPropsWithRef<'span'>;
export type FlexProps = CommonFlexProps & (FlexDivProps | FlexSpanProps);
