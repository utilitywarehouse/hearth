import dayjs from 'dayjs';
import { memo, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { Numerals } from '../DatePicker/DatePicker.props';
import { formatNumber, getParsedDate } from '../DatePicker/utils';
import type { DateType, PickerOption } from './TimePicker.props';
import TimePickerWheel from './TimePickerWheel';

export type Period = 'AM' | 'PM';

type TimePickerViewProps = {
  currentDate: DateType;
  onSelectDate: (date: DateType) => void;
  timeZone?: string;
  use12Hours?: boolean;
  minuteInterval?: number;
  containerHeight?: number;
};

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

const createMinuteList = (interval: number, numerals: Numerals): PickerOption[] => {
  const safeInterval = Math.min(59, Math.max(1, Math.floor(interval)));
  const values = Array.from({ length: Math.ceil(60 / safeInterval) }, (_, index) =>
    Math.min(index * safeInterval, 59)
  ).filter((value, index, array) => array.indexOf(value) === index && value < 60);

  return values.map(value => ({
    value,
    text:
      value < 10
        ? `${formatNumber(0, numerals)}${formatNumber(value, numerals)}`
        : `${formatNumber(value, numerals)}`,
  }));
};

const getClosestMinute = (value: number, options: PickerOption[]) => {
  if (!options.length) return value;
  const values = options.map(option => option.value as number);
  if (values.includes(value)) return value;

  let closest = values[0] ?? value;
  let closestDiff = Math.abs(value - closest);

  values.forEach(optionValue => {
    const diff = Math.abs(value - optionValue);
    if (diff < closestDiff) {
      closestDiff = diff;
      closest = optionValue;
    }
  });

  return closest;
};

const TimePickerView = ({
  currentDate,
  onSelectDate,
  timeZone,
  use12Hours,
  minuteInterval = 1,
}: TimePickerViewProps) => {
  const hours = useMemo(
    () => createNumberList(use12Hours ? 12 : 24, 'latn', use12Hours ? 1 : 0),
    [use12Hours]
  );

  const minutes = useMemo(() => createMinuteList(minuteInterval, 'latn'), [minuteInterval]);

  const periodOptions = useMemo(
    () => [
      { value: 'AM', text: 'AM' },
      { value: 'PM', text: 'PM' },
    ],
    []
  );

  const baseDate = currentDate;
  const { hour, hour12, minute, period } = getParsedDate(baseDate);
  const minuteValue = useMemo(() => getClosestMinute(minute, minutes), [minute, minutes]);

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

      const newDate = dayjs.tz(baseDate, timeZone).hour(hour24).minute(minuteValue);
      onSelectDate(newDate);
    },
    [baseDate, onSelectDate, timeZone, use12Hours, period, minuteValue]
  );

  const handleChangeMinute = useCallback(
    (value: number) => {
      const newDate = dayjs.tz(baseDate, timeZone).minute(value);
      onSelectDate(newDate);
    },
    [baseDate, onSelectDate, timeZone]
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

      const newDate = dayjs.tz(baseDate, timeZone).hour(newHour);
      onSelectDate(newDate);
    },
    [baseDate, onSelectDate, timeZone, hour, hour12]
  );

  return (
    <View style={styles.container} testID="time-selector">
      <View style={styles.timePickerContainer}>
        <View style={styles.wheelContainer}>
          <TimePickerWheel
            value={use12Hours ? hour12 : hour}
            items={hours}
            setValue={handleChangeHour}
          />
        </View>
        <BodyText style={styles.timeSeparator} size="lg">
          :
        </BodyText>
        <View style={styles.wheelContainer}>
          <TimePickerWheel value={minuteValue} items={minutes} setValue={handleChangeMinute} />
        </View>
      </View>
      {use12Hours && period ? (
        <View style={styles.periodContainer}>
          <TimePickerWheel value={period} items={periodOptions} setValue={handlePeriodChange} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  wheelContainer: {
    flex: 1,
  },
  timePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 146,
    height: 208,
    flexDirection: 'row',
  },
  timeSeparator: {
    marginHorizontal: 5,
  },
  periodContainer: {
    marginLeft: 10,
  },
});

const customComparator = (
  prev: Readonly<TimePickerViewProps>,
  next: Readonly<TimePickerViewProps>
) => {
  if (prev.onSelectDate !== next.onSelectDate) {
    return false;
  }

  if (prev.timeZone !== next.timeZone) {
    return false;
  }

  if (prev.use12Hours !== next.use12Hours) {
    return false;
  }

  if (prev.minuteInterval !== next.minuteInterval) {
    return false;
  }

  return dayjs(prev.currentDate).isSame(next.currentDate, 'minute');
};

export default memo(TimePickerView, customComparator);
