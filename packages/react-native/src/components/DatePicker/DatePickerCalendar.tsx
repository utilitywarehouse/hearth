import { ReactNode } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useDatePickerContext } from './DatePicker.context';
import Days from './DatePickerDays';
import Footer from './DatePickerFooter';
import Header from './DatePickerHeader';
import Months from './DatePickerMonths';
import Years from './DatePickerYears';
import type { CalendarViews } from './enums';
import TimePicker from './TimePicker';

const CalendarView: Record<CalendarViews, ReactNode> = {
  year: <Years />,
  month: <Months />,
  day: <Days />,
  time: <TimePicker />,
};

const Calendar = () => {
  const { hideHeader, hideFooter, calendarView, containerHeight, navigationPosition } =
    useDatePickerContext();

  return (
    <View style={[styles.container]} testID="calendar">
      {!hideHeader ? <Header navigationPosition={navigationPosition} /> : null}
      <View style={styles.containerInner(containerHeight)}>{CalendarView[calendarView]}</View>
      {!hideFooter ? <Footer /> : null}
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
