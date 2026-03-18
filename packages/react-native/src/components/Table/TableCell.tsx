import { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { useTableContext } from './Table.context';
import { TableCellProps } from './Table.props';
import { getColumnStyle } from './Table.utils';

const renderContent = (children?: ReactNode, weight: 'regular' | 'semibold' = 'regular') => {
  if (typeof children === 'string' || typeof children === 'number') {
    return (
      <BodyText size="md" weight={weight}>
        {children}
      </BodyText>
    );
  }

  return children;
};

const TableCell = ({
  children,
  style,
  ...props
}: TableCellProps & { columnIndex?: number; isLast?: boolean; isLastRow?: boolean }) => {
  const { columnWidths, container, hasPagination } = useTableContext();
  const { columnIndex = 0, isLast, isLastRow, ...rest } = props;
  const removeBottomBorder = Boolean(isLastRow && container !== 'none' && !hasPagination);
  const columnStyle = getColumnStyle(columnWidths[columnIndex], 120);

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
      {renderContent(children)}
    </View>
  );
};

TableCell.displayName = 'TableCell';

const styles = StyleSheet.create(theme => ({
  cell: {
    minHeight: theme.components.table.cell.minHeight,
    justifyContent: 'center',
    padding: theme.components.table.cell.padding,
    borderRightWidth: theme.components.table.cell.borderWidth,
    borderBottomWidth: theme.components.table.cell.borderWidth,
    borderColor: theme.color.border.subtle,
    backgroundColor: theme.color.surface.neutral.strong,
  },
  lastCell: {
    borderRightWidth: 0,
  },
  lastRowCell: {
    borderBottomWidth: 0,
  },
}));

export default TableCell;
