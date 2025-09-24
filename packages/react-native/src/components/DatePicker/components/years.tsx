import { useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../../BodyText';
import { useCalendarContext } from '../Calendar.context';
import { CONTAINER_HEIGHT } from '../enums';
import { formatNumber, getDateYear, getYearRange, isYearDisabled } from '../utils';

const Years = () => {
  const {
    mode,
    calendar = 'gregory',
    numerals = 'latn',
    currentDate,
    currentYear,
    date,
    onSelectYear,
    containerHeight = CONTAINER_HEIGHT,
    minDate,
    maxDate,
  } = useCalendarContext();

  const selectedYear = getDateYear(date);

  const generateCells = useCallback(() => {
    const years = getYearRange(currentYear);
    const activeYear = getDateYear(currentDate);
    const column = years.map(year => {
      const isSelected = year === selectedYear;
      const isActivated = year === activeYear;

      const isDisabled = isYearDisabled(year, { minDate, maxDate });

      styles.useVariants({ isSelected, isDisabled, isActivated });

      return (
        <View key={year} style={styles.yearCell(containerHeight)}>
          <Pressable
            disabled={isDisabled}
            onPress={() => onSelectYear(year)}
            accessibilityRole="button"
            accessibilityLabel={year.toString()}
            style={styles.year}
          >
            <BodyText key={year} style={styles.label}>
              {formatNumber(year, numerals)}
            </BodyText>
          </Pressable>
        </View>
      );
    });
    return column;
  }, [
    onSelectYear,
    selectedYear,
    currentYear,
    currentDate,
    styles,
    mode,
    minDate,
    maxDate,
    numerals,
    calendar,
  ]);

  return (
    <View style={[styles.container, styles.years]} testID="year-selector">
      <View style={styles.years}>{generateCells()}</View>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  years: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  year: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: theme.borderRadius.md,
    variants: {
      isActivated: {
        true: {
          backgroundColor: theme.color.surface.brand.default,
        },
      },
      isDisabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
      isSelected: {
        true: {},
      },
    },
  },
  yearCell: (containerHeight: number) => ({
    width: `${99.9 / 3}%`,
    height: containerHeight / 6,
    padding: 2,
  }),
  label: {
    variants: {
      isActivated: {
        true: {
          color: theme.color.text.inverted,
        },
      },
    },
  },
}));

export default Years;
