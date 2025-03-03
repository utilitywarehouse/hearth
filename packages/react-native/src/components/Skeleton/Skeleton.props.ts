import type { DimensionValue, ViewProps } from 'react-native';
import type { ColorValue, BorderRadiusValue } from '../../types';

interface SkeletonProps extends ViewProps {
  width: DimensionValue;
  height: DimensionValue;
  backgroundColor?: ColorValue;
  borderRadius?: BorderRadiusValue;
}

export default SkeletonProps;
