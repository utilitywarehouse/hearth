import { BackgroundColorProps } from '../../props/background-color.props';
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
import { useRender } from '@base-ui-components/react/use-render';

const displayValues = ['none', 'inline', 'inline-block', 'block'] as const;

export const boxPropDefs = {
  display: { className: 'display', tokens: displayValues, responsive: true },
} satisfies {
  display: PropDef<(typeof displayValues)[number]>;
};

export interface BoxProps
  extends Omit<useRender.ComponentProps<'div'>, 'color'>,
    PositionProps,
    ColorProps,
    BackgroundColorProps,
    PaddingProps,
    MarginProps,
    SizeProps,
    BorderProps,
    GridItemProps,
    FlexItemProps,
    TextAlignProps,
    TextTransformProps {
  display?: Responsive<(typeof displayValues)[number]>;
}
