import type { FlexAlignType, ViewProps, ViewStyle } from 'react-native';
import {
  DisplayProps,
  FlexLayoutProps,
  GapProps,
  MarginProps,
  PaddingProps,
  SpacingValues,
} from '../../types';

interface FlexProps
  extends
    ViewProps,
    MarginProps,
    PaddingProps,
    FlexLayoutProps,
    GapProps,
    Omit<DisplayProps, 'direction'> {
  direction?: ViewStyle['flexDirection'];
  align?: FlexAlignType;
  justify?: ViewStyle['justifyContent'];
  wrap?: ViewStyle['flexWrap'];
  spacing?: SpacingValues;
  /**
   * The space between child elements (gap).
   * @deprecated Use `spacing` instead. The `space` prop will be removed in a future release.
   */
  space?: SpacingValues;
}

export default FlexProps;
