import dayjs from 'dayjs';
import { memo } from 'react';
import { Pressable } from 'react-native';
import { BodyText } from '../../BodyText';
import { useDatePickerContext } from '../DatePicker.context';

const MonthButton = () => {
  const { currentDate, calendarView, setCalendarView, disableMonthPicker, monthCaptionFormat } =
    useDatePickerContext();

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
      accessibilityHint={`${calendarView === 'month' ? 'Tap to switch to day view' : 'Tap to switch to month view'}`}
    >
      <BodyText weight="semibold">{currentMonthText}</BodyText>
    </Pressable>
  );
};

export default memo(MonthButton);
