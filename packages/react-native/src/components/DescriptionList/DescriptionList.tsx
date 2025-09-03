import { useMemo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { SectionHeader } from '../SectionHeader';
import { DescriptionListContext } from './DescriptionList.context';
import type DescriptionListProps from './DescriptionList.props';

const DescriptionList = ({
  direction = 'column',
  itemHeadingWidth,
  heading,
  helperText,
  linkText,
  linkHref,
  linkIcon,
  linkIconPosition,
  linkOnPress,
  linkTarget,
  linkShowIcon,
  children,
  style,
  ...props
}: DescriptionListProps) => {
  styles.useVariants({ direction });
  const value = useMemo(() => ({ direction, itemHeadingWidth }), [direction, itemHeadingWidth]);

  return (
    <DescriptionListContext.Provider value={value}>
      <View accessibilityRole="list" {...props} style={[styles.container, style]}>
        {heading || linkText ? (
          <SectionHeader
            heading={heading as string}
            helperText={helperText}
            linkText={linkText}
            linkHref={linkHref}
            linkIcon={linkIcon}
            linkIconPosition={linkIconPosition}
            linkOnPress={linkOnPress}
            linkTarget={linkTarget}
            linkShowIcon={linkShowIcon}
          />
        ) : null}
        {children}
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
}));

export default DescriptionList;
