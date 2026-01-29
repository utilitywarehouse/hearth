import { ErrorCircleSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useTheme } from '../../hooks';
import { BodyText } from '../BodyText';
import { DetailText } from '../DetailText';
import Helper from '../Helper/Helper';
import { useDescriptionListContext } from './DescriptionList.context';
import type DescriptionListItemProps from './DescriptionListItem.props';

const DescriptionListItem = ({
  heading,
  description,
  headingWidth,
  trailingContent,
  invalidText,
  numericValue,
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
        <View style={[direction === 'row' && { width: headingWidth || itemHeadingWidth }]}>
          {headingIsText ? <BodyText style={styles.headingText}>{heading}</BodyText> : heading}
        </View>
        <View style={styles.descriptionWrapper}>
          {descIsText ? <BodyText>{description}</BodyText> : description}
          {!!invalidText && (
            <Helper
              validationStatus="invalid"
              showIcon
              icon={ErrorCircleSmallIcon}
              text={invalidText || ''}
            />
          )}
        </View>
        {numericValue ? (
          <View style={styles.descriptionWrapper}>
            <DetailText size="lg">{numericValue}</DetailText>
          </View>
        ) : null}
      </View>
      {trailingContent ? trailingContent : null}
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
  headingText: {
    color: theme.color.text.secondary,
  },
  descriptionWrapper: {
    variants: {
      direction: {
        row: {
          flex: 1,
        },
        column: {},
      },
    },
  },
}));

export default DescriptionListItem;
