import type { DimensionValue, ViewProps } from 'react-native';
import type { ColorValue } from '../../types';

interface DividerProps extends Omit<ViewProps, 'children'> {
  color?: ColorValue;
  space?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  orientation?: 'horizontal' | 'vertical';
  height?: DimensionValue;
  width?: DimensionValue;
  flexItem?: boolean;
}

export default DividerProps;
