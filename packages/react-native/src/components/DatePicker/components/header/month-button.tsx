import dayjs from 'dayjs';
import { memo } from 'react';
import { Pressable } from 'react-native';
import { BodyText } from '../../../BodyText';
import { useCalendarContext } from '../../Calendar.context';

const MonthButton = () => {
  const { currentDate, calendarView, setCalendarView, disableMonthPicker, monthCaptionFormat } =
    useCalendarContext();

  const currentMonthText = dayjs(currentDate)
    .locale('en')
    .format(monthCaptionFormat === 'full' ? 'MMMM' : 'MMM');

  return (
    <Pressable
      disabled={disableMonthPicker}
      onPress={() => setCalendarView(calendarView === 'month' ? 'day' : 'month')}
      testID="btn-month"
      accessibilityRole="button"
      accessibilityLabel={currentMonthText}
    >
      <BodyText weight="semibold">{currentMonthText}</BodyText>
    </Pressable>
  );
};

export default memo(MonthButton);
