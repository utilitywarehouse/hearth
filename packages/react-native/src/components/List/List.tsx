import React, { ReactNode, useMemo } from 'react';
import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Card } from '../Card';
import { SectionHeader } from '../SectionHeader';
import { ListContext, ListFirstItemContext } from './List.context';
import type ListProps from './List.props';
import { ListAction } from './ListAction';
import { ListItem } from './ListItem';

const markFirstListItem = (children: ReactNode): ViewProps['children'] => {
  let found = false;

  const recursiveClone = (children: ReactNode): ReactNode => {
    return React.Children.map(children, (child: ReactNode): ReactNode => {
      if (!React.isValidElement(child)) return child;

      // Check if the current element is the ListItem or ListAction and hasn't been marked yet
      if (!found) {
        if (child.type === ListItem || child.type === ListAction) {
          found = true;
          return (
            <ListFirstItemContext.Provider value={true}>{child}</ListFirstItemContext.Provider>
          );
        }

        // If the child has nested children, process them recursively
        if (
          React.isValidElement(child) &&
          child.props &&
          typeof child.props === 'object' &&
          child.props !== null &&
          'children' in child.props &&
          child.props.children
        ) {
          const clonedChildren = recursiveClone((child.props as any).children);
          return React.cloneElement(child, { children: clonedChildren } as any);
        }

        found = true;
        return <ListFirstItemContext.Provider value={true}>{child}</ListFirstItemContext.Provider>;
      }

      return child;
    });
  };

  return recursiveClone(children) as ViewProps['children'];
};

const List = ({ children, heading, helperText, headerTrailingContent, ...props }: ListProps) => {
  const { loading, disabled, container = 'none' } = props;
  const containerToCard: {
    variant: 'subtle' | 'emphasis';
    colorScheme: 'neutralStrong' | 'neutralSubtle';
  } = {
    variant: container === 'subtleWhite' || container === 'subtleWarmWhite' ? 'subtle' : 'emphasis',
    colorScheme:
      container === 'subtleWhite' || container === 'emphasisWhite'
        ? 'neutralStrong'
        : 'neutralSubtle',
  };
  const updatedChildren = markFirstListItem(children);
  const value = useMemo(() => ({ loading, disabled, container }), [loading, disabled, container]);
  styles.useVariants({ disabled });
  return (
    <ListContext.Provider value={value}>
      <View {...props} style={[styles.container, props.style]}>
        {heading ? (
          <SectionHeader
            heading={heading}
            helperText={helperText}
            trailingContent={headerTrailingContent}
          />
        ) : null}
        {container === 'none' ? (
          <View>{updatedChildren}</View>
        ) : (
          React.Children.count(updatedChildren) > 0 && (
            <Card {...containerToCard} noPadding style={styles.card}>
              <>{updatedChildren}</>
            </Card>
          )
        )}
      </View>
    </ListContext.Provider>
  );
};

List.displayName = 'List';

const styles = StyleSheet.create(theme => ({
  container: {
    width: theme.space.full,
    gap: theme.components.list.gap,
    variants: {
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
    },
  },
  card: {
    alignItems: 'stretch',
  },
}));

export default List;
