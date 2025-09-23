import { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { BodyText } from '../../BodyText';
import { WEEKDAYS_HEIGHT } from '../enums';
import { CalendarComponents, ClassNames, Styles, WeekdayFormat } from '../types';
import { getWeekdays } from '../utils';

type WeekdaysProps = {
  locale: string;
  firstDayOfWeek: number;
  styles?: Styles;
  classNames?: ClassNames;
  weekdaysFormat?: WeekdayFormat;
  weekdaysHeight?: number;
  components?: CalendarComponents;
};

const Weekdays = ({
  locale,
  firstDayOfWeek,
  styles = {},
  classNames = {},
  weekdaysFormat = 'min',
  weekdaysHeight = WEEKDAYS_HEIGHT,
  components = {},
}: WeekdaysProps) => {
  const style = useMemo(() => createDefaultStyles(weekdaysHeight), [weekdaysHeight]);

  return (
    <View
      style={[style.container, styles.weekdays]}
      className={classNames.weekdays}
      testID="weekdays"
    >
      {getWeekdays(locale, firstDayOfWeek)?.map((weekday, index) => (
        <View key={index} style={[style.weekday, styles.weekday]} className={classNames.weekday}>
          {components.Weekday ? (
            components.Weekday(weekday)
          ) : (
            <BodyText style={styles?.weekday_label} className={classNames.weekday_label}>
              {weekday.name[weekdaysFormat]}
            </BodyText>
          )}
        </View>
      ))}
    </View>
  );
};

export default memo(Weekdays);

const createDefaultStyles = (weekdaysHeight: number) =>
  StyleSheet.create({
    container: {
      height: weekdaysHeight,
      flexDirection: 'row',
      alignItems: 'center',
    },
    weekday: {
      width: `${99.9 / 7}%`,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
