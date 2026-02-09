import type { DimensionValue, ViewProps } from 'react-native';
import type { ColorValue, SpacingValues } from '../../types';

interface DividerProps extends Omit<ViewProps, 'children'> {
  color?: ColorValue;
  backgroundColor?: ColorValue;
  spacing?: SpacingValues;
  /**
   * The space between child elements (gap).
   * @deprecated Use `spacing` instead. The `space` prop will be removed in a future release.
   */
  space?: SpacingValues;
  orientation?: 'horizontal' | 'vertical';
  height?: DimensionValue;
  width?: DimensionValue;
  flexItem?: boolean;
}

export default DividerProps;
