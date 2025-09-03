import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useTheme } from '../../hooks';
import { BodyText } from '../BodyText';
import { Link } from '../Link';
import { useDescriptionListContext } from './DescriptionList.context';
import type DescriptionListItemProps from './DescriptionListItem.props';

const DescriptionListItem = ({
  heading,
  description,
  headingWidth,
  linkText,
  linkHref,
  linkIcon,
  linkIconPosition,
  linkOnPress,
  linkTarget,
  linkShowIcon,
  style,
  ...props
}: DescriptionListItemProps) => {
  const { components } = useTheme();
  const { direction, itemHeadingWidth = components.descriptionList.item.row.headingWidth } =
    useDescriptionListContext();
  styles.useVariants({ direction });
  const headingIsText = typeof heading === 'string' || typeof heading === 'number';
  const descIsText = typeof description === 'string' || typeof description === 'number';
  const combinedLabel = headingIsText && descIsText ? `${heading}: ${description}` : undefined;
  const hideDescendants = !!combinedLabel;
  return (
    <View
      accessibilityRole="text"
      accessible={!!combinedLabel}
      accessibilityLabel={combinedLabel}
      {...props}
      style={[styles.item, style]}
    >
      <View
        style={styles.textWrap}
        importantForAccessibility={hideDescendants ? 'no-hide-descendants' : undefined}
        accessibilityElementsHidden={hideDescendants || undefined}
      >
        <View
          style={[
            styles.headingWrapper,
            direction === 'row' && { width: headingWidth || itemHeadingWidth },
          ]}
        >
          {headingIsText ? <BodyText style={styles.headingText}>{heading}</BodyText> : heading}
        </View>
        <View style={styles.descriptionWrapper}>
          {descIsText ? <BodyText>{description}</BodyText> : description}
        </View>
      </View>
      {linkText ? (
        <Link
          href={linkHref}
          onPress={linkOnPress}
          target={linkTarget}
          showIcon={linkShowIcon}
          icon={linkIcon}
          iconPosition={linkIconPosition}
          accessibilityRole="link"
        >
          {linkText}
        </Link>
      ) : null}
    </View>
  );
};

DescriptionListItem.displayName = 'DescriptionListItem';

const styles = StyleSheet.create(theme => ({
  item: {
    width: theme.space.full,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.components.descriptionList.item.gap,
  },
  textWrap: {
    flex: 1,
    variants: {
      direction: {
        row: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: theme.components.descriptionList.item.row.gap,
        },
        column: {
          flexDirection: 'column',
          gap: theme.components.descriptionList.item.column.gap,
        },
      },
    },
  },
  headingWrapper: {
    // width applied dynamically for row via headingWidth or token
    variants: {},
  },
  headingText: {
    color: theme.color.text.secondary,
  },
  descriptionWrapper: {
    flex: 1,
  },
}));

export default DescriptionListItem;
