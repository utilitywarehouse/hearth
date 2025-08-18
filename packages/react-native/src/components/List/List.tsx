import React, { ReactNode, useMemo } from 'react';
import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Card } from '../Card';
import { ListContext } from './List.context';
import type ListProps from './List.props';
import { SectionHeader } from '../SectionHeader';
import { ListItem, ListItemProps } from './ListItem';

const markFirstListItem = (children: ReactNode): ViewProps['children'] => {
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

      return child;
    });
  };

  return recursiveClone(children) as ViewProps['children'];
};

const List = ({
  children,
  heading,
  helperText,
  linkText,
  linkHref,
  linkIcon,
  linkIconPosition,
  linkOnPress,
  linkTarget,
  linkShowIcon,
  ...props
}: ListProps) => {
  const { loading, disabled, divider = true, container = 'none' } = props;
  const containerToCard: {
    variant: 'subtle' | 'emphasis';
    colorScheme: 'white' | 'warmWhite';
  } = {
    variant: container === 'subtleWhite' || container === 'subtleWarmWhite' ? 'subtle' : 'emphasis',
    colorScheme:
      container === 'subtleWhite' || container === 'emphasisWhite' ? 'white' : 'warmWhite',
  };
  const updatedChildren = markFirstListItem(children);
  const value = useMemo(
    () => ({ loading, disabled, divider, container }),
    [loading, disabled, divider, container]
  );
  styles.useVariants({ disabled });
  return (
    <ListContext.Provider value={value}>
      <View {...props} style={[styles.container, props.style]}>
        {heading ? (
          <SectionHeader
            heading={heading}
            helperText={helperText}
            linkText={linkText}
            linkHref={linkHref}
            linkOnPress={linkOnPress}
            linkTarget={linkTarget}
            linkIcon={linkIcon}
            linkIconPosition={linkIconPosition}
            linkShowIcon={linkShowIcon}
          />
        ) : null}
        {container === 'none' ? (
          <View>{updatedChildren}</View>
        ) : (
          <Card {...containerToCard} noPadding style={styles.card}>
            <>{updatedChildren}</>
          </Card>
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
