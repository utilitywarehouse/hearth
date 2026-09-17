import type { DimensionValue, ViewProps } from 'react-native';
import type { ColorValue, SpacingValues } from '../../types';

interface DividerProps extends Omit<ViewProps, 'children'> {
  /** The color of the divider line. */
  color?: ColorValue;
  /** The background color of the divider line. */
  backgroundColor?: ColorValue;
  /** The space around the divider. */
  spacing?: SpacingValues;
  /**
   * The space between child elements (gap).
   * @deprecated Use `spacing` instead. The `space` prop will be removed in a future release.
   */
  space?: SpacingValues;
  /**
   * The orientation of the divider.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /** The height of the divider. */
  height?: DimensionValue;
  /** The width of the divider. */
  width?: DimensionValue;
  /** Gives a vertical divider the correct height when used inside a flex container. */
  flexItem?: boolean;
}

export default DividerProps;
