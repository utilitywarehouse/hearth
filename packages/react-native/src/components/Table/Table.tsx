import { Children, isValidElement, useState } from 'react';
import { type LayoutChangeEvent, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-unistyles';
import { Card } from '../Card';
import { TableContextProvider } from './Table.context';
import type { TableProps } from './Table.props';
import { getMinTableWidth } from './Table.utils';

const MIN_COLUMN_WIDTH = 120;

const getChildCount = (node: React.ReactNode): number => {
  if (!isValidElement(node)) {
    return 0;
  }

  const childProps = node.props as { children?: React.ReactNode };
  return Children.count(childProps.children);
};

const getMaxColumnCount = (children: React.ReactNode): number => {
  let maxColumns = 1;

  Children.forEach(children, child => {
    if (!isValidElement(child)) {
      return;
    }

    const childType = child.type as { displayName?: string };
    const childProps = child.props as { children?: React.ReactNode };

    if (childType.displayName === 'TableHeader') {
      maxColumns = Math.max(maxColumns, getChildCount(child));
      return;
    }

    if (childType.displayName === 'TableBody') {
      Children.forEach(childProps.children, rowChild => {
        maxColumns = Math.max(maxColumns, getChildCount(rowChild));
      });
    }
  });

  return maxColumns;
};

const Table = ({
  children,
  columnWidths = [],
  container = 'none',
  pagination,
  style,
  ...props
}: TableProps) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const columnCount = getMaxColumnCount(children);
  const minTableWidth = getMinTableWidth(columnCount, columnWidths, MIN_COLUMN_WIDTH);
  const tableWidth = Math.max(containerWidth, minTableWidth);
  const isScrollable = tableWidth > containerWidth + 1;

  const handleLayout = (event: LayoutChangeEvent) => {
    const nextWidth = event.nativeEvent.layout.width;
    setContainerWidth(currentWidth => (currentWidth === nextWidth ? currentWidth : nextWidth));
  };

  const content = (
    <View onLayout={handleLayout} style={styles.wrapper}>
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        canCancelContentTouches
        contentContainerStyle={styles.scrollContent}
        horizontal
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        overScrollMode="never"
        scrollEnabled={isScrollable}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator
      >
        <View style={[styles.content, { width: tableWidth || minTableWidth }]}>{children}</View>
      </ScrollView>
      {pagination ? <View style={styles.pagination}>{pagination}</View> : null}
    </View>
  );

  const hasPagination = Boolean(pagination);

  return (
    <TableContextProvider value={{ columnCount, columnWidths, container, hasPagination }}>
      {container !== 'none' ? (
        <Card {...props} colorScheme="neutralStrong" noPadding style={style} variant={container}>
          {content}
        </Card>
      ) : (
        <View {...props} style={[styles.plainTable, style]}>
          {content}
        </View>
      )}
    </TableContextProvider>
  );
};

Table.displayName = 'Table';

const styles = StyleSheet.create(theme => ({
  wrapper: {
    width: '100%',
  },
  plainTable: {
    width: '100%',
    overflow: 'hidden',
  },
  scrollContent: {
    minWidth: '100%',
  },
  content: {
    alignSelf: 'flex-start',
  },
  pagination: {
    paddingHorizontal: theme.components.table.cell.padding,
    paddingVertical: theme.space[200],
  },
}));

export default Table;
