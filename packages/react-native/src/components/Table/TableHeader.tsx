import { Children, cloneElement, isValidElement } from 'react';
import { View, ViewStyle } from 'react-native';
import { TableHeaderProps } from './Table.props';

const TableHeader = ({ children, color = 'purple', style, ...props }: TableHeaderProps) => {
  const items = Children.toArray(children);

  return (
    <View {...props} style={[styles.header, style as ViewStyle]}>
      {items.map((child, index) => {
        if (!isValidElement(child)) {
          return child;
        }

        return cloneElement(
          child as React.ReactElement<{
            color?: 'purple' | 'white';
            columnIndex?: number;
            isLast?: boolean;
          }>,
          {
            color,
            columnIndex: index,
            isLast: index === items.length - 1,
          }
        );
      })}
    </View>
  );
};

TableHeader.displayName = 'TableHeader';

const styles = {
  header: {
    flexDirection: 'row' as const,
    width: '100%' as const,
  },
};

export default TableHeader;
