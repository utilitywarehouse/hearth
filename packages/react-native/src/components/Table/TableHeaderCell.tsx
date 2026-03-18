import { cloneElement, isValidElement, ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { useTableContext } from './Table.context';
import type { TableHeaderCellProps } from './Table.props';
import { getColumnStyle } from './Table.utils';

const renderContent = (
  children?: ReactNode,
  weight: 'regular' | 'semibold' = 'semibold',
  color: 'purple' | 'white' = 'white'
) => {
  if (typeof children === 'string' || typeof children === 'number') {
    return (
      <BodyText size="md" weight={weight} style={styles.text} inverted={color === 'purple'}>
        {children}
      </BodyText>
    );
  }

  return children;
};

const TableHeaderCell = ({
  children,
  color = 'white',
  row = false,
  style,
  trailingContent,
  ...props
}: TableHeaderCellProps & { columnIndex?: number; isLast?: boolean; isLastRow?: boolean }) => {
  const { columnWidths, container, hasPagination } = useTableContext();
  const { columnIndex = 0, isLast, isLastRow, ...rest } = props;
  const removeBottomBorder = Boolean(row && isLastRow && container !== 'none' && !hasPagination);
  const columnStyle = getColumnStyle(columnWidths[columnIndex], 120);

  styles.useVariants({ color, row });

  const trailingElement =
    trailingContent && isValidElement(trailingContent)
      ? (trailingContent as React.ReactElement<{ inverted?: boolean }>)
      : null;

  const resolvedTrailingContent =
    trailingElement && !row && 'inverted' in (trailingElement.props ?? {})
      ? cloneElement(trailingElement, {
          inverted: color === 'purple',
        })
      : trailingContent;

  return (
    <View
      {...rest}
      style={[
        styles.cell,
        columnStyle,
        isLast && styles.lastCell,
        removeBottomBorder && styles.lastRowCell,
        style as ViewStyle,
      ]}
    >
      <View style={styles.content}>
        {renderContent(children, 'semibold', color)}
        {resolvedTrailingContent ? (
          <View style={styles.trailing}>{resolvedTrailingContent}</View>
        ) : null}
      </View>
    </View>
  );
};

TableHeaderCell.displayName = 'TableHeaderCell';

const styles = StyleSheet.create(theme => ({
  cell: {
    minHeight: theme.components.table.headerCell.height,
    justifyContent: 'center',
    paddingHorizontal: theme.components.table.headerCell.paddingHorizontal,
    paddingVertical: theme.components.table.headerCell.paddingVertical,
    borderRightWidth: theme.components.table.headerCell.borderWidth,
    borderBottomWidth: theme.components.table.headerCell.borderWidth,
    borderColor: theme.color.border.subtle,
    backgroundColor: theme.color.surface.neutral.strong,
    variants: {
      color: {
        purple: {
          borderColor: theme.color.interactive.brand.foreground.strong,
          backgroundColor: theme.color.surface.brand.default,
        },
        white: {
          borderColor: theme.color.border.subtle,
          backgroundColor: theme.color.surface.neutral.strong,
        },
      },
      row: {
        true: {
          minHeight: theme.components.table.cell.minHeight,
          paddingHorizontal: theme.components.table.cell.padding,
          paddingVertical: theme.components.table.cell.padding,
          borderRightWidth: theme.components.table.cell.borderWidth,
          borderBottomWidth: theme.components.table.cell.borderWidth,
          borderColor: theme.color.border.subtle,
          backgroundColor: theme.color.surface.neutral.strong,
        },
      },
    },
  },
  lastCell: {
    borderRightWidth: 0,
  },
  lastRowCell: {
    borderBottomWidth: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.components.table.headerCell.gap,
  },
  trailing: {
    flexShrink: 0,
  },
  text: {
    flexShrink: 1,
    variants: {
      row: {
        true: {
          color: theme.color.text.primary,
        },
      },
    },
  },
}));

export default TableHeaderCell;
