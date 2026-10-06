import React, { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Card } from '../Card';
import { SectionHeader } from '../SectionHeader';
import { ListContext } from './List.context';
import type ListProps from './List.props';

/** Use List to group `ListItem` and `ListAction` components under an optional heading, with a shared container style and disabled/loading state. */
const List = ({
  children,
  heading,
  helperText,
  headerTrailingContent,
  invalidText,
  ...props
}: ListProps) => {
  const {
    loading,
    disabled,
    container = 'none',
    testID,
    style,
    accessibilityRole,
    ...rest
  } = props;

  const orderRef = useRef<string[]>([]);
  const [firstItemId, setFirstItemId] = useState<string | undefined>(undefined);
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

  const registerItem = useCallback((id: string) => {
    if (!orderRef.current.includes(id)) {
      orderRef.current.push(id);
    }
    const nextFirst = orderRef.current[0];
    setFirstItemId(prev => (prev === nextFirst ? prev : nextFirst));
    return () => {
      orderRef.current = orderRef.current.filter(currentId => currentId !== id);
      const nextFirst = orderRef.current[0];
      setFirstItemId(prev => (prev === nextFirst ? prev : nextFirst));
    };
  }, []);

  const listRole = accessibilityRole ?? 'list';

  const value = {
    loading,
    disabled,
    container,
    isList: listRole === 'list',
    firstItemId,
    registerItem,
  };
  styles.useVariants({ disabled });
  return (
    <ListContext.Provider value={value}>
      <View {...rest} style={[styles.container, style]}>
        {heading ? (
          <SectionHeader
            heading={heading}
            helperText={helperText}
            trailingContent={headerTrailingContent}
            invalidText={invalidText}
          />
        ) : null}
        {/* The list only wraps the items: a heading inside role="list" is not a valid child. */}
        {container === 'none' ? (
          <View testID={testID} accessibilityRole={listRole}>
            {children}
          </View>
        ) : (
          React.Children.count(children) > 0 && (
            <Card {...containerToCard} noPadding style={styles.card} testID={testID}>
              <View accessibilityRole={listRole}>{children}</View>
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
