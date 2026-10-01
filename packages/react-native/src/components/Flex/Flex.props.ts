import type { FlexAlignType, ViewProps, ViewStyle } from 'react-native';
import {
  DisplayProps,
  FlexLayoutProps,
  GapProps,
  MarginProps,
  PaddingProps,
  SizeProps,
  SpacingValues,
} from '../../types';

interface FlexProps
  extends
    ViewProps,
    MarginProps,
    PaddingProps,
    FlexLayoutProps,
    GapProps,
    Pick<SizeProps, 'width'>,
    Omit<DisplayProps, 'direction'> {
  /**
   * The direction of the flex container.
   * @default 'column'
   */
  direction?: ViewStyle['flexDirection'];
  /**
   * The align items of the flex container.
   * @default 'flex-start'
   */
  align?: FlexAlignType;
  /**
   * The justify content of the flex container.
   * @default 'flex-start'
   */
  justify?: ViewStyle['justifyContent'];
  /**
   * The wrap of the flex container.
   * @default 'nowrap'
   */
  wrap?: ViewStyle['flexWrap'];
  /**
   * The space between the content.
   * @default 'md'
   */
  spacing?: SpacingValues;
  /**
   * The space between child elements (gap).
   * @deprecated Use `spacing` instead. The `space` prop will be removed in a future release.
   */
  space?: SpacingValues;
}

export default FlexProps;
