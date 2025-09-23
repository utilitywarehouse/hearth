import { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { BodyText } from '../../BodyText';
import { useCalendarContext } from '../Calendar.context';
import { CONTAINER_HEIGHT } from '../enums';
import { cn, getMonthsArray, getParsedDate, isMonthDisabled } from '../utils';

const Months = () => {
  const {
    currentDate,
    onSelectMonth,
    styles = {},
    classNames = {},
    components = {},
    containerHeight = CONTAINER_HEIGHT,
    monthsFormat = 'full',
    minDate,
    maxDate,
  } = useCalendarContext();

  const style = useMemo(() => createDefaultStyles(containerHeight), [containerHeight]);

  const { month } = getParsedDate(currentDate);

  const containerStyle = StyleSheet.flatten([style.container, styles?.months]);

  return (
    <View style={containerStyle} testID="month-selector">
      <View style={style.months}>
        {getMonthsArray().map((item, index) => {
          const isSelected = index === month;

          const isDisabled = isMonthDisabled(index, currentDate, {
            minDate,
            maxDate,
          });

          const itemStyle = StyleSheet.flatten([
            style.month,
            styles.month,
            isSelected && styles.selected_month,
            isDisabled && styles.disabled,
          ]);

          const textStyle = StyleSheet.flatten([
            styles.month_label,
            isSelected && styles.selected_month_label,
            isDisabled && styles.disabled_label,
          ]);

          const containerClassName = cn(
            classNames.month,
            isSelected && classNames.selected_month,
            isDisabled && classNames.disabled
          );

          const textClassName = cn(
            classNames.month_label,
            isSelected && classNames.selected_month_label,
            isDisabled && classNames.disabled_label
          );

          return (
            <View key={index} style={style.monthCell}>
              {components.Month ? (
                <Pressable
                  disabled={isDisabled}
                  onPress={() => onSelectMonth(index)}
                  accessibilityRole="button"
                  accessibilityLabel={item.name.full}
                  style={style.month}
                >
                  {components.Month({ ...item, isSelected })}
                </Pressable>
              ) : (
                <Pressable
                  disabled={isDisabled}
                  onPress={() => onSelectMonth(index)}
                  accessibilityRole="button"
                  accessibilityLabel={item.name.full}
                  style={itemStyle}
                  className={containerClassName}
                >
                  <BodyText key={index} style={textStyle} className={textClassName}>
                    {item.name[monthsFormat]}
                  </BodyText>
                </Pressable>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const createDefaultStyles = (containerHeight: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    months: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    month: {
      flex: 1,
      margin: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    monthCell: {
      width: `${99.9 / 3}%`,
      height: containerHeight / 6,
    },
  });

export default Months;
