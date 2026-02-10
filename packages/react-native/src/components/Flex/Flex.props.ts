import type { FlexAlignType, ViewProps, ViewStyle } from 'react-native';
import { SpacingValues } from '../../types';

interface FlexProps extends ViewProps {
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
