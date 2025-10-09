import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { useDatePickerContext } from './DatePicker.context';
import { Numerals, PickerOption } from './DatePicker.props';
import { CONTAINER_HEIGHT } from './enums';
import PeriodPicker from './time-picker/period-picker';
import Wheel from './time-picker/wheel';
import { formatNumber, getParsedDate } from './utils';

export type Period = 'AM' | 'PM';

const createNumberList = (
  num: number,
  numerals: Numerals,
  startFrom: number = 0
): PickerOption[] => {
  return Array.from({ length: num }, (_, i) => ({
    value: i + startFrom,
    text:
      i + startFrom < 10
        ? `${formatNumber(0, numerals)}${formatNumber(i + startFrom, numerals)}`
        : `${formatNumber(i + startFrom, numerals)}`,
  }));
};

const TimePicker = () => {
  const {
    currentDate,
    date,
    onSelectDate,
    timeZone,
    numerals = 'latn',
    use12Hours,
  } = useDatePickerContext();

  const hours = useMemo(
    () => createNumberList(use12Hours ? 12 : 24, numerals, use12Hours ? 1 : 0),
    [numerals, use12Hours]
  );

  const minutes = useMemo(() => createNumberList(60, numerals), [numerals]);

  const { hour, hour12, minute, period } = getParsedDate(date || currentDate);

  const handleChangeHour = useCallback(
    (value: number) => {
      let hour24 = value;

      if (use12Hours) {
        if (period === 'AM' && value === 12) {
          hour24 = 0;
        } else if (period === 'PM' && value < 12) {
          hour24 = value + 12;
        } else {
          hour24 = value;
        }
      }
      const newDate = dayjs.tz(date, timeZone).hour(hour24).minute(minute);
      onSelectDate(newDate);
    },
    [date, onSelectDate, timeZone, use12Hours, period, minute]
  );

  const handleChangeMinute = useCallback(
    (value: number) => {
      const newDate = dayjs.tz(date, timeZone).minute(value);
      onSelectDate(newDate);
    },
    [date, onSelectDate, timeZone]
  );

  const handlePeriodChange = useCallback(
    (newPeriod: Period) => {
      let newHour = hour12;
      if (newPeriod === 'PM' && hour12 < 12) {
        newHour = hour12 + 12;
      } else if (newPeriod === 'AM' && hour12 === 12) {
        newHour = 0;
      } else if (newPeriod === 'AM' && hour >= 12) {
        newHour = hour12;
      }

      const newDate = dayjs.tz(date || currentDate, timeZone).hour(newHour);
      onSelectDate(newDate);
    },
    [date, currentDate, onSelectDate, timeZone, hour, hour12]
  );

  return (
    <ScrollView
      horizontal={true}
      scrollEnabled={false}
      contentContainerStyle={styles.container}
      testID="time-selector"
    >
      <View style={styles.timePickerContainer}>
        <View style={styles.wheelContainer}>
          <Wheel value={use12Hours ? hour12 : hour} items={hours} setValue={handleChangeHour} />
        </View>
        <BodyText style={styles.timeSeparator}>:</BodyText>
        <View style={styles.wheelContainer}>
          <Wheel value={minute} items={minutes} setValue={handleChangeMinute} />
        </View>
      </View>
      {use12Hours && period ? (
        <View style={styles.periodContainer}>
          <PeriodPicker value={period} setValue={handlePeriodChange} />
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelContainer: {
    flex: 1,
  },
  timePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: CONTAINER_HEIGHT / 2,
    height: CONTAINER_HEIGHT / 2,
    flexDirection: 'row',
  },
  timeSeparator: {
    marginHorizontal: 5,
  },
  periodContainer: {
    marginLeft: 10,
  },
});

export default TimePicker;
