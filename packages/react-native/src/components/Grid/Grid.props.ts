import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import type { BoxProps } from '../Box/Box.props';
import { SpaceValue } from '../../types';

export interface GridProps extends BoxProps<'div'> {
  /**
   * Number of columns to display
   * Can be a fixed number or an object with breakpoints
   */
  columns?:
    | number
    | {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
      };

  /**
   * Spacing between grid items (applied to both rows and columns)
   */
  spacing?: number | string;

  /**
   * Column gap between items
   */
  columnGap?: SpaceValue;

  /**
   * Row gap between items
   */
  rowGap?: SpaceValue;

  /**
   * Additional style for the grid container
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Style applied to each item's container
   */
  itemStyle?: StyleProp<ViewStyle>;

  /**
   * Children to be rendered in the grid
   */
  children?: React.ReactNode;
}

export default GridProps;
