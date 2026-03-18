import { Children, cloneElement, isValidElement } from 'react';
import { View } from 'react-native';
import { TableBodyProps } from './Table.props';

const TableBody = ({ children, ...props }: TableBodyProps) => {
  const items = Children.toArray(children);

  return (
    <View {...props}>
      {items.map((child, index) => {
        if (!isValidElement(child)) {
          return child;
        }

        return cloneElement(child as React.ReactElement<{ isLastRow?: boolean }>, {
          isLastRow: index === items.length - 1,
        });
      })}
    </View>
  );
};

TableBody.displayName = 'TableBody';

export default TableBody;
