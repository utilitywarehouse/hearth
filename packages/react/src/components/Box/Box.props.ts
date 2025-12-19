import { BackgroundColorProps } from '../../props/background-color.props';
import { BorderColorProps } from '../../props/border-color.props';
import { BorderRadiusProps } from '../../props/border-radius.props';
import { BorderStyleProps } from '../../props/border-style.props';
import { BorderWidthProps } from '../../props/border-width.props';
import { ColorProps } from '../../props/color.props';
import { FlexItemProps } from '../../props/flex-item.props';
import { GridItemProps } from '../../props/grid-item.props';
import { MarginProps } from '../../props/margin.props';
import { OverflowProps } from '../../props/overflow.props';
import { PaddingProps } from '../../props/padding.props';
import { PositionProps } from '../../props/position.props';
import { PropDef } from '../../props/prop-def';
import { SizeProps } from '../../props/size.props';
import { TextAlignProps } from '../../props/text-align.props';
import { TextTransformProps } from '../../props/text-transform.props';
import { ZIndexProps } from '../../props/z-index.props';
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
    BorderWidthProps,
    BorderStyleProps,
    BorderColorProps,
    BorderRadiusProps,
    GridItemProps,
    FlexItemProps,
    TextAlignProps,
    TextTransformProps,
    ZIndexProps,
    OverflowProps {
  asChild?: boolean;
  display?: Responsive<(typeof displayValues)[number]>;
}
type BoxDivProps = { as?: 'div' } & React.ComponentPropsWithRef<'div'>;
type BoxSpanProps = { as: 'span' } & React.ComponentPropsWithRef<'span'>;
export type BoxProps = CommonBoxProps & (BoxSpanProps | BoxDivProps);
