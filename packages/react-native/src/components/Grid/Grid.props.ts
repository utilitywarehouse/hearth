import { BoxProps } from '../Box/Box.props';
import { StyleProp, ViewStyle } from 'react-native';
import { UnistylesBreakpoints } from 'react-native-unistyles';
import { SpaceValue } from '../../types';

// Create a type that uses the keys from our breakpoints object
export type GridColumns = {
  [key in keyof UnistylesBreakpoints]?: number;
};

export interface GridProps extends BoxProps {
  /**
   * Number of columns or responsive object defining columns at different breakpoints
   * @default 2
   */
  columns?: number | GridColumns;

  /**
   * Spacing between grid items (applies to both rows and columns)
   */
  spacing?: SpaceValue;

  /**
   * Gap between columns (overrides spacing if provided)
   */
  columnGap?: SpaceValue;

  /**
   * Gap between rows (overrides spacing if provided)
   */
  rowGap?: SpaceValue;

  /**
   * Style for the grid container
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Style for each grid item
   */
  itemStyle?: StyleProp<ViewStyle>;

  /**
   * Style for each row
   */
  rowStyle?: StyleProp<ViewStyle>;

  /**
   * Grid items
   */
  children?: React.ReactNode;
}
