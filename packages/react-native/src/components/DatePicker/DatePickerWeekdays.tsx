import { memo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { WeekdayFormat } from './DatePicker.props';
import { WEEKDAYS_HEIGHT } from './enums';
import { getWeekdays } from './utils';

type WeekdaysProps = {
  firstDayOfWeek: number;
  weekdaysFormat?: WeekdayFormat;
  weekdaysHeight?: number;
};

const Weekdays = ({
  firstDayOfWeek,
  weekdaysFormat = 'min',
  weekdaysHeight = WEEKDAYS_HEIGHT,
}: WeekdaysProps) => {
  return (
    <View style={[styles.container(weekdaysHeight)]} testID="weekdays">
      {getWeekdays(firstDayOfWeek)?.map((weekday, index) => (
        <View key={index} style={[styles.weekday]}>
          <BodyText style={styles.text} accessible={false}>
            {weekday.name[weekdaysFormat]}
          </BodyText>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: (weekdaysHeight: number) => ({
    height: weekdaysHeight,
    flexDirection: 'row',
    alignItems: 'center',
  }),
  text: {
    color: theme.color.text.secondary,
  },
  weekday: {
    width: `${99.9 / 7}%`,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default memo(Weekdays);
