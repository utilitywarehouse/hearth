import {
  ChevronDownSmallIcon,
  ChevronUpSmallIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { memo } from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../../Icon';
import { useDatePickerContext } from '../DatePicker.context';
import { NavigationPosition } from '../DatePicker.props';
import MonthButton from './DatePickerMonthButton';
import { TimeButton } from './DatePickerTimeButton';
import YearButton from './DatePickerYearButton';

type Props = {
  position: NavigationPosition;
};

const Selectors = ({ position }: Props) => {
  const { mode, calendarView, timePicker, setCalendarView } = useDatePickerContext();
  styles.useVariants({ position });
  const onPress = () => {
    if (calendarView === 'month' || calendarView === 'year') {
      setCalendarView('day');
    }
    if (calendarView === 'day' || calendarView === 'time') {
      setCalendarView('month');
    }
  };
  return (
    <View style={[styles.container]}>
      <View style={styles.monthYearWrap}>
        <View style={styles.monthAndYear}>
          {calendarView !== 'year' ? <MonthButton /> : null}
          <YearButton />
        </View>
        <Pressable
          onPress={onPress}
          accessibilityRole="button"
          accessibilityLabel={`Change to ${calendarView === 'month' || calendarView === 'year' ? 'day' : 'month'} view`}
        >
          <Icon
            as={
              calendarView === 'month' || calendarView === 'year'
                ? ChevronUpSmallIcon
                : ChevronDownSmallIcon
            }
            style={styles.icon}
          />
        </Pressable>
      </View>
      {timePicker && mode === 'single' && calendarView !== 'year' ? <TimeButton /> : null}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    variants: {
      position: {
        left: {
          justifyContent: 'space-between',
          flexDirection: 'row-reverse',
        },
        right: {
          justifyContent: 'space-between',
          flexDirection: 'row',
        },
        around: {
          justifyContent: 'space-evenly',
        },
      },
    },
  },
  icon: {
    color: theme.color.icon.primary,
    width: theme.components.icon.sm.width,
    height: theme.components.icon.sm.height,
  },
  monthYearWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.components.datePicker.calendar.header.dateGap,
  },
  monthAndYear: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

export default memo(Selectors);
