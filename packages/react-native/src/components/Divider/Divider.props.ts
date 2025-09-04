import type { DimensionValue, ViewProps } from 'react-native';
import type { ColorValue, SpacingValues } from '../../types';

interface DividerProps extends Omit<ViewProps, 'children'> {
  color?: ColorValue;
  space?: SpacingValues;
  orientation?: 'horizontal' | 'vertical';
  height?: DimensionValue;
  width?: DimensionValue;
  flexItem?: boolean;
}

export default DividerProps;
