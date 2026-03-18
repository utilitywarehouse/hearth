import { Children, cloneElement, isValidElement } from 'react';
import { View } from 'react-native';
import { TableRowProps } from './Table.props';

const TableRow = ({ children, ...props }: TableRowProps & { isLastRow?: boolean }) => {
  const items = Children.toArray(children);
  const { isLastRow = false, ...rest } = props;

  return (
    <View {...rest} style={[styles.row, rest.style]}>
      {items.map((child, index) => {
        if (!isValidElement(child)) {
          return child;
        }

        return cloneElement(
          child as React.ReactElement<{
            columnIndex?: number;
            isLast?: boolean;
            isLastRow?: boolean;
          }>,
          {
            isLast: index === items.length - 1,
            columnIndex: index,
            isLastRow,
          }
        );
      })}
    </View>
  );
};

TableRow.displayName = 'TableRow';

const styles = {
  row: {
    flexDirection: 'row' as const,
    width: '100%' as const,
  },
};

export default TableRow;
