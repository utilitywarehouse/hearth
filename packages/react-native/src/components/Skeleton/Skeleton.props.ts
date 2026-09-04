import type { DimensionValue, ViewProps } from 'react-native';
import type { ColorValue, BorderRadiusValue } from '../../types';

interface SkeletonProps extends ViewProps {
  /** The width of the skeleton. */
  width: DimensionValue;
  /** The height of the skeleton. */
  height: DimensionValue;
  /** The background color of the skeleton. Falls back to the theme's loading colour. */
  backgroundColor?: ColorValue;
  /** The border radius of the skeleton. Falls back to the theme's `xs` border radius. */
  borderRadius?: BorderRadiusValue;
}

export default SkeletonProps;
