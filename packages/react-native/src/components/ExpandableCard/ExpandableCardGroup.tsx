import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { SectionHeader } from '../SectionHeader';
import type ExpandableCardGroupProps from './ExpandableCardGroup.props';

const ExpandableCardGroup = ({
  heading,
  helperText,
  headerTrailingContent,
  children,
  style,
  testID = 'expandable-card-group',
  invalidText,
  ...props
}: ExpandableCardGroupProps) => {
  return (
    <View style={[styles.container, style]} testID={testID} {...props}>
      {heading ? (
        <SectionHeader
          heading={heading}
          helperText={helperText}
          trailingContent={headerTrailingContent}
          invalidText={invalidText}
        />
      ) : null}
      <View style={styles.cardsContainer}>{children}</View>
    </View>
  );
};

ExpandableCardGroup.displayName = 'ExpandableCardGroup';

const styles = StyleSheet.create(theme => ({
  container: {
    gap: theme.components.expandableCard.group.gap,
  },
  cardsContainer: {
    gap: theme.components.expandableCard.group.gap,
  },
}));

export default ExpandableCardGroup;
