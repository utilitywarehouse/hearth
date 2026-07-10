import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { memo, useCallback } from 'react';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../../Icon';
import { useDatePickerContext } from '../DatePicker.context';
import { YEAR_PAGE_SIZE } from '../utils';

const NextButton = () => {
  const { currentYear, onChangeMonth, onChangeYear, calendarView } = useDatePickerContext();

  const onPress = useCallback(() => {
    switch (calendarView) {
      case 'day':
        return onChangeMonth(1);
      case 'month':
        return onChangeYear(currentYear + 1);
      case 'year':
        return onChangeYear(currentYear + YEAR_PAGE_SIZE);
      default:
        return {};
    }
  }, [calendarView, currentYear, onChangeMonth, onChangeYear]);

  return (
    <Pressable
      disabled={calendarView === 'time'}
      onPress={onPress}
      testID="btn-next"
      accessibilityRole="button"
      accessibilityLabel={`Next ${calendarView === 'day' ? 'month' : calendarView === 'month' ? 'year' : 'years'}`}
    >
      <Icon as={ChevronRightSmallIcon} style={styles.icon} />
    </Pressable>
  );
};

const styles = StyleSheet.create(theme => ({
  icon: {
    width: theme.components.iconSize.sm,
    height: theme.components.iconSize.sm,
    color: theme.color.icon.primary,
  },
}));

export default memo(NextButton);
