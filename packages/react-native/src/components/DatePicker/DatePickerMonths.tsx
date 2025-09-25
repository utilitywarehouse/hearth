import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { useDatePickerContext } from './DatePicker.context';
import { CONTAINER_HEIGHT } from './enums';
import { getMonthsArray, getParsedDate, isMonthDisabled } from './utils';

const Months = () => {
  const {
    currentDate,
    onSelectMonth,
    containerHeight = CONTAINER_HEIGHT,
    monthsFormat = 'short',
    minDate,
    maxDate,
  } = useDatePickerContext();

  const { month } = getParsedDate(currentDate);

  return (
    <View style={styles.container} testID="month-selector">
      <View style={styles.months}>
        {getMonthsArray().map((item, index) => {
          const isSelected = index === month;
          const isDisabled = isMonthDisabled(index, currentDate, {
            minDate,
            maxDate,
          });
          styles.useVariants({ isSelected, isDisabled });

          return (
            <View key={index} style={styles.monthCell(containerHeight)}>
              <Pressable
                disabled={isDisabled}
                onPress={() => onSelectMonth(index)}
                accessibilityRole="button"
                accessibilityLabel={item.name.full}
                style={styles.item}
              >
                <BodyText key={index} style={styles.label}>
                  {item.name[monthsFormat]}
                </BodyText>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  months: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  month: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthCell: (containerHeight: number) => ({
    width: `${99.9 / 3}%`,
    height: containerHeight / 6,
    padding: 2,
  }),
  label: {
    variants: {
      isSelected: {
        true: {
          color: theme.color.text.inverted,
        },
      },
    },
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: theme.borderRadius.md,
    variants: {
      isSelected: {
        true: {
          backgroundColor: theme.color.surface.brand.default,
        },
      },
      isDisabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
    },
  },
}));

export default Months;
