import React, { useMemo, useRef } from 'react';
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
  const listIndexRef = useRef(0);
  const renderIdRef = useRef(0);
  renderIdRef.current += 1;
  listIndexRef.current = 0;
  const renderId = renderIdRef.current;
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
  const value = useMemo(
    () => ({
      loading,
      disabled,
      container,
      renderId,
      getNextListIndex: () => {
        const current = listIndexRef.current;
        listIndexRef.current += 1;
        return current;
      },
    }),
    [loading, disabled, container, renderId]
  );
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
