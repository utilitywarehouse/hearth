import React, { useMemo } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import Box from '../Box/Box';
import type { GridProps } from './Grid.props';

const Grid: React.FC<GridProps> = ({
  columns = 2,
  spacing,
  columnGap,
  rowGap,
  containerStyle,
  itemStyle,
  children,
  ...boxProps
}) => {
  const { width } = useWindowDimensions();

  const childrenArray = React.Children.toArray(children).filter(Boolean);

  const getColumnsForWidth = useMemo(() => {
    // If columns is a number, use that number
    if (typeof columns === 'number') {
      return columns;
    }

    // If columns is an object, determine the number of columns based on screen width
    if (typeof columns === 'object') {
      if (width < 576 && columns.xs !== undefined) {
        return columns.xs;
      } else if (width < 768 && columns.sm !== undefined) {
        return columns.sm;
      } else if (width < 992 && columns.md !== undefined) {
        return columns.md;
      } else if (width < 1200 && columns.lg !== undefined) {
        return columns.lg;
      } else if (columns.xl !== undefined) {
        return columns.xl;
      }
    }

    // Default to 2 columns
    return 2;
  }, [columns, width]);

  const computedColumnGap = columnGap ?? spacing;
  const computedRowGap = rowGap ?? spacing;

  // Create rows and columns structure for better control over layout
  const rows = useMemo(() => {
    const result: React.ReactNode[][] = [];
    let currentRow: React.ReactNode[] = [];

    childrenArray.forEach((child, index) => {
      currentRow.push(child);

      // When we reach the end of a row or the end of all children
      if ((index + 1) % getColumnsForWidth === 0 || index === childrenArray.length - 1) {
        result.push([...currentRow]);
        currentRow = [];
      }
    });

    return result;
  }, [childrenArray, getColumnsForWidth]);

  return (
    <Box {...boxProps} style={[styles.container, containerStyle]}>
      <View style={[styles.rowsContainer, { gap: computedRowGap as number }]}>
        {rows.map((rowItems, rowIndex) => (
          <View key={`row-${rowIndex}`} style={[styles.row, { gap: computedColumnGap as number }]}>
            {rowItems.map((child, colIndex) => {
              return (
                <View key={`item-${rowIndex}-${colIndex}`} style={[styles.item, itemStyle]}>
                  {child}
                </View>
              );
            })}

            {/* Add empty placeholder items to fill the last row if needed */}
            {rowItems.length < getColumnsForWidth &&
              Array.from({ length: getColumnsForWidth - rowItems.length }).map((_, index) => (
                <View key={`placeholder-${rowIndex}-${index}`} style={[styles.item]} />
              ))}
          </View>
        ))}
      </View>
    </Box>
  );
};

const styles = StyleSheet.create(() => ({
  container: {
    width: '100%',
  },
  rowsContainer: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  item: {
    alignSelf: 'stretch',
    flex: 1,
  },
}));

Grid.displayName = 'Grid';

export default Grid;
