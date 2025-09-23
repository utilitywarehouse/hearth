import dayjs from 'dayjs';
import { memo } from 'react';
import { Pressable, View } from 'react-native';
import { BodyText } from '../../../BodyText';
import { useCalendarContext } from '../../Calendar.context';

const MonthButton = () => {
  const {
    currentDate,
    calendarView,
    setCalendarView,
    calendar = 'gregory',
    locale,
    styles,
    classNames,
    disableMonthPicker,
    monthCaptionFormat,
  } = useCalendarContext();

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
      <View style={styles?.month_selector} className={classNames?.month_selector}>
        <BodyText style={styles?.month_selector_label} className={classNames?.month_selector_label}>
          {currentMonthText}
        </BodyText>
      </View>
    </Pressable>
  );
};

export default memo(MonthButton);
