import { BorderColorProps } from '../../props/border-color.props';
import { BorderStyleProps } from '../../props/border-style.props';
import { BorderWidthProps } from '../../props/border-width.props';
import { ColorProps } from '../../props/color.props';
import { GridItemProps } from '../../props/grid-item.props';
import { TextAlignProps } from '../../props/text-align.props';
import { TextTransformProps } from '../../props/text-transform.props';
import { Responsive } from '../../types/responsive';
import { FlexProps } from '../Flex/Flex.props';

export type ContainerProps = Omit<
  FlexProps,
  | 'as'
  | keyof ColorProps
  | keyof BorderWidthProps
  | keyof BorderStyleProps
  | keyof BorderColorProps
  | keyof GridItemProps
  | keyof TextTransformProps
  | keyof TextAlignProps
> & {
  align?: Responsive<'start' | 'center' | 'end'>;
};
