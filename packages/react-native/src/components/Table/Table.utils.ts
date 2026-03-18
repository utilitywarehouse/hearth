import type { ViewStyle } from 'react-native';
import type { TableColumnWidth } from './Table.props';

const FR_UNIT_PATTERN = /^(\d*\.?\d+)fr$/;

const parseFractionUnit = (columnWidth?: TableColumnWidth): number | null => {
  if (typeof columnWidth !== 'string') {
    return null;
  }

  const match = columnWidth.match(FR_UNIT_PATTERN);
  if (!match) {
    return null;
  }

  const parsedValue = Number(match[1]);
  return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : null;
};

const getFlexGrow = (columnWidth?: TableColumnWidth): number => {
  if (!columnWidth || typeof columnWidth === 'number') {
    return 1;
  }

  if (typeof columnWidth === 'string') {
    return parseFractionUnit(columnWidth) ?? 1;
  }

  return Number.isFinite(columnWidth.flex) && columnWidth.flex > 0 ? columnWidth.flex : 1;
};

export const getColumnMinWidth = (
  columnWidth: TableColumnWidth | undefined,
  minColumnWidth: number
): number => {
  if (typeof columnWidth === 'number') {
    return Math.max(columnWidth, minColumnWidth);
  }

  return minColumnWidth;
};

export const getMinTableWidth = (
  columnCount: number,
  columnWidths: TableColumnWidth[],
  minColumnWidth: number
): number => {
  return Array.from({ length: columnCount }).reduce<number>((totalWidth, _, index) => {
    return totalWidth + getColumnMinWidth(columnWidths[index], minColumnWidth);
  }, 0);
};

export const getColumnStyle = (
  columnWidth: TableColumnWidth | undefined,
  minColumnWidth: number
): ViewStyle => {
  if (typeof columnWidth === 'number') {
    return {
      width: columnWidth,
      minWidth: columnWidth,
      flexGrow: 0,
      flexShrink: 0,
    };
  }

  return {
    minWidth: minColumnWidth,
    flexBasis: 0,
    flexGrow: getFlexGrow(columnWidth),
    flexShrink: 0,
  };
};
