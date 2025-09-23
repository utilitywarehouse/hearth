import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { memo, useCallback, useMemo } from 'react';
import { ImageStyle, Pressable, StyleSheet, useColorScheme, View } from 'react-native';
import { isEqual } from '../../../../utils';
import { Icon } from '../../../Icon';
import { useCalendarContext } from '../../Calendar.context';
import { COLORS } from '../../theme';
import { Styles } from '../../types';
import { UI } from '../../ui';
import { YEAR_PAGE_SIZE } from '../../utils';

type NextButtonProps = {
  style?: Styles[UI.button_next];
  imageStyle?: Styles[UI.button_next_image];
};

const NextButton = ({ style, imageStyle }: NextButtonProps) => {
  const {
    currentYear,
    onChangeMonth,
    onChangeYear,
    calendarView,
    components = {},
  } = useCalendarContext();

  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const defaultStyles = useMemo(() => createDefaultStyles(), []);

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

  const iconStyle: ImageStyle = useMemo(
    () => ({
      ...defaultStyles.icon,
      tintColor: COLORS[theme].foreground,
      ...(imageStyle as ImageStyle),
    }),
    [imageStyle, theme, defaultStyles.icon]
  );

  return (
    <Pressable
      disabled={calendarView === 'time'}
      onPress={onPress}
      testID="btn-next"
      accessibilityRole="button"
      accessibilityLabel="Next"
    >
      <View style={[defaultStyles.iconContainer, defaultStyles.next, style]}>
        {components.IconNext || <Icon as={ChevronRightSmallIcon} style={iconStyle} />}
      </View>
    </Pressable>
  );
};

const customComparator = (prev: Readonly<NextButtonProps>, next: Readonly<NextButtonProps>) => {
  const areEqual = isEqual(prev.style, next.style) && isEqual(prev.imageStyle, next.imageStyle);

  return areEqual;
};

export default memo(NextButton, customComparator);

const createDefaultStyles = () =>
  StyleSheet.create({
    iconContainer: {
      padding: 4,
    },
    next: {
      marginLeft: 3,
      marginRight: 0,
    },
    icon: {
      width: 14,
      height: 14,
    },
  });
