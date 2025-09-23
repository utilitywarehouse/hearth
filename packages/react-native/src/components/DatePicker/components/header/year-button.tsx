import dayjs from 'dayjs';
import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { BodyText } from '../../../BodyText';
import { useCalendarContext } from '../../Calendar.context';
import { formatNumber, getDateYear, getYearRange } from '../../utils';

const YearButton = () => {
  const {
    currentDate,
    calendarView,
    setCalendarView,
    currentYear,
    onChangeYear,
    styles,
    classNames,
    disableYearPicker,
    calendar = 'gregory',
    numerals = 'latn',
  } = useCalendarContext();

  const years = getYearRange(currentYear);
  return (
    <Pressable
      disabled={disableYearPicker}
      onPress={() => {
        setCalendarView(calendarView === 'year' ? 'day' : 'year');
        onChangeYear(getDateYear(currentDate));
      }}
      testID="btn-year"
      accessibilityRole="button"
      accessibilityLabel={dayjs(currentDate).format('YYYY')}
    >
      <View
        style={[defaultStyles.container, styles?.year_selector]}
        className={classNames?.year_selector}
      >
        <BodyText style={styles?.year_selector_label} className={classNames?.year_selector_label}>
          {calendarView === 'year'
            ? `${formatNumber(years[0] || 0, numerals)} - ${formatNumber(years[years.length - 1] || 0, numerals)}`
            : formatNumber(parseInt(dayjs(currentDate).format('YYYY')), numerals)}
        </BodyText>
      </View>
    </Pressable>
  );
};

export default memo(YearButton);

const defaultStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
