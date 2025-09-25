import dayjs from 'dayjs';
import { memo } from 'react';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
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
    disableYearPicker,
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
      style={[styles.container]}
    >
      <BodyText weight="semibold">
        {calendarView === 'year'
          ? `${formatNumber(years[0] || 0, numerals)} - ${formatNumber(years[years.length - 1] || 0, numerals)}`
          : formatNumber(parseInt(dayjs(currentDate).format('YYYY')), numerals)}
      </BodyText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(YearButton);
