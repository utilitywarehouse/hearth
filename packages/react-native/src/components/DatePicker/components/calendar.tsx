import { ReactNode } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
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
  const { hideHeader, calendarView, containerHeight, navigationPosition } = useCalendarContext();

  return (
    <View style={[styles.container]} testID="calendar">
      {!hideHeader ? <Header navigationPosition={navigationPosition} /> : null}
      <View style={styles.containerInner(containerHeight)}>{CalendarView[calendarView]}</View>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.color.background.secondary,
    gap: theme.components.datePicker.calendar.gap,
  },
  containerInner: (height?: number) => ({ height }),
}));

export default Calendar;
