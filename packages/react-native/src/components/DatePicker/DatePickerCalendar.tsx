import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import TimePickerView from '../TimePicker/TimePickerView';
import { useDatePickerContext } from './DatePicker.context';
import Days from './DatePickerDays';
import Footer from './DatePickerFooter';
import Header from './DatePickerHeader';
import Months from './DatePickerMonths';
import Years from './DatePickerYears';

const Calendar = () => {
  const {
    hideHeader,
    hideFooter,
    calendarView,
    containerHeight,
    navigationPosition,
    date,
    currentDate,
    onSelectDate,
    timeZone,
    numerals,
    use12Hours,
  } = useDatePickerContext();

  const calendarContent =
    calendarView === 'year' ? (
      <Years />
    ) : calendarView === 'month' ? (
      <Months />
    ) : calendarView === 'time' ? (
      <TimePickerView
        date={date}
        currentDate={currentDate}
        onSelectDate={onSelectDate}
        timeZone={timeZone}
        numerals={numerals}
        use12Hours={use12Hours}
        containerHeight={containerHeight}
      />
    ) : (
      <Days />
    );

  return (
    <View style={[styles.container]} testID="calendar">
      {!hideHeader ? <Header navigationPosition={navigationPosition} /> : null}
      <View style={styles.containerInner(containerHeight)}>{calendarContent}</View>
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
