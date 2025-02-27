import React, { forwardRef, ReactNode, useMemo } from 'react';
import type ListProps from './List.props';
import { ListHeading } from './ListHeading';
import { ListContext } from './List.context';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { ListItem, ListItemProps } from './ListItem';

const markFirstListItem = (children: ReactNode): ReactNode => {
  let found = false;

  const recursiveClone = (children: ReactNode): ReactNode => {
    return React.Children.map(children, (child: ReactNode): ReactNode => {
      if (!React.isValidElement(child)) return child;

      // Check if the current element is the ListItem and hasn't been marked yet
      if (!found && child.type === ListItem) {
        found = true;
        // Cast the additional prop to match ListItemProps
        return React.cloneElement(child, { isFirst: true } as Partial<ListItemProps>);
      }

      // If the child has nested children, process them recursively
      if (child.props && child.props.children) {
        const clonedChildren = recursiveClone(child.props.children);
        return React.cloneElement(child, { children: clonedChildren } as Partial<ListProps>);
      }

      return child;
    });
  };

  return recursiveClone(children);
};

const List = forwardRef<View, ListProps>(
  ({ children, headingText, headingSupportingText, ...props }, ref) => {
    const { loading, disabled, divider = true, container = 'none' } = props;
    const updatedChildren = markFirstListItem(children);
    const value = useMemo(
      () => ({ loading, disabled, divider, container }),
      [loading, disabled, divider, container]
    );
    styles.useVariants({ disabled });
    return (
      <ListContext.Provider value={value}>
        <View ref={ref} {...props} style={[styles.container, props.style]}>
          {headingText ? (
            <ListHeading text={headingText} supportingText={headingSupportingText} />
          ) : null}
          <View>{updatedChildren}</View>
        </View>
      </ListContext.Provider>
    );
  }
);

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
}));

export default List;
