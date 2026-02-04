import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Card } from '../Card';
import { SectionHeader } from '../SectionHeader';
import { ListContext } from './List.context';
import type ListProps from './List.props';

const List = ({
  children,
  heading,
  helperText,
  headerTrailingContent,
  invalidText,
  ...props
}: ListProps) => {
  const { loading, disabled, container = 'none' } = props;
  let nextIndex = 0;
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
  const value = {
    loading,
    disabled,
    container,
    getNextListIndex: () => {
      const current = nextIndex;
      nextIndex += 1;
      return current;
    },
  };
  styles.useVariants({ disabled });
  return (
    <ListContext.Provider value={value}>
      <View {...props} style={[styles.container, props.style]}>
        {heading ? (
          <SectionHeader
            heading={heading}
            helperText={helperText}
            trailingContent={headerTrailingContent}
            invalidText={invalidText}
          />
        ) : null}
        {container === 'none' ? (
          <View>{children}</View>
        ) : (
          React.Children.count(children) > 0 && (
            <Card {...containerToCard} noPadding style={styles.card}>
              <>{children}</>
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
