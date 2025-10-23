import { BorderColorProps } from '../../props/border-color.props';
import { BorderProps } from '../../props/border.props';
import { ColorProps } from '../../props/color.props';
import { FlexItemProps } from '../../props/flex-item.props';
import { GridItemProps } from '../../props/grid-item.props';
import { PaddingProps } from '../../props/padding.props';
import { TextAlignProps } from '../../props/text-align.props';
import { TextTransformProps } from '../../props/text-transform.props';
import { Responsive } from '../../types/responsive';
import { FlexProps } from '../Flex/Flex.props';

export type ContainerProps = Omit<
  FlexProps,
  | 'as'
  | keyof PaddingProps
  | keyof ColorProps
  | keyof BorderProps
  | keyof BorderColorProps
  | keyof FlexItemProps
  | keyof GridItemProps
  | keyof TextTransformProps
  | keyof TextAlignProps
> & {
  align?: Responsive<'start' | 'center' | 'end'>;
};
