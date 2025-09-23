import { ReactNode, useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { useCalendarContext } from '../Calendar.context';
import type { CalendarViews } from '../enums';
import Days from './days';
import Header from './header';
import Months from './months';
import TimePicker from './time-picker';
import Years from './years';

const CalendarView: Record<CalendarViews, ReactNode> = {
  year: <Years />,
  month: <Months />,
  day: <Days />,
  time: <TimePicker />,
};

const Calendar = () => {
  const {
    hideHeader,
    calendarView,
    style = {},
    className = '',
    styles = {},
    classNames = {},
    containerHeight,
    navigationPosition,
    isRTL,
  } = useCalendarContext();

  const containerStyle: ViewStyle = useMemo(
    () => ({
      height: containerHeight,
    }),
    [containerHeight]
  );

  return (
    <View style={[style, { backgroundColor: 'white' }]} className={className} testID="calendar">
      {!hideHeader ? (
        <Header
          navigationPosition={navigationPosition}
          styles={styles}
          classNames={classNames}
          isRTL={isRTL}
        />
      ) : null}
      <View style={containerStyle}>{CalendarView[calendarView]}</View>
    </View>
  );
};

export default Calendar;
