import { useMemo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { SectionHeader } from '../SectionHeader';
import { DescriptionListContext } from './DescriptionList.context';
import type DescriptionListProps from './DescriptionList.props';

/**
 * Use DescriptionList to display a list of related heading/description pairs, laid out as
 * stacked rows or two columns, with an optional heading and helper text above the list.
 */
const DescriptionList = ({
  direction = 'column',
  itemHeadingWidth,
  heading,
  helperText,
  headerTrailingContent,
  children,
  style,
  invalidText,
  // Labels name the list itself, so they go on the inner list rather than the outer container.
  accessibilityLabel,
  'aria-label': ariaLabel,
  accessibilityLabelledBy,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: DescriptionListProps) => {
  styles.useVariants({ direction });
  const value = useMemo(() => ({ direction, itemHeadingWidth }), [direction, itemHeadingWidth]);

  return (
    <DescriptionListContext.Provider value={value}>
      <View {...props} style={[styles.container, style]}>
        {heading ? (
          <SectionHeader
            heading={heading}
            helperText={helperText}
            trailingContent={headerTrailingContent}
            invalidText={invalidText}
          />
        ) : null}
        {/* The list only wraps the items: a heading inside role="list" is not a valid child. */}
        <View
          accessibilityRole="list"
          accessibilityLabel={accessibilityLabel}
          aria-label={ariaLabel}
          accessibilityLabelledBy={accessibilityLabelledBy}
          aria-labelledby={ariaLabelledBy}
          style={styles.list}
        >
          {children}
        </View>
      </View>
    </DescriptionListContext.Provider>
  );
};

DescriptionList.displayName = 'DescriptionList';

const styles = StyleSheet.create(theme => ({
  container: {
    width: theme.space.full,
    gap: theme.components.descriptionList.gap,
    variants: {
      direction: {
        row: {},
        column: {},
      },
    },
  },
  list: {
    width: theme.space.full,
    gap: theme.components.descriptionList.gap,
  },
}));

export default DescriptionList;
