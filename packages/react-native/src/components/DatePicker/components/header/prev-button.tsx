import { ChevronLeftSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { memo, useCallback, useMemo } from 'react';
import { ImageStyle, Pressable, StyleSheet, useColorScheme, View } from 'react-native';
import { isEqual } from '../../../../utils';
import { Icon } from '../../../Icon';
import { useCalendarContext } from '../../Calendar.context';
import { COLORS } from '../../theme';
import { Styles } from '../../types';
import { UI } from '../../ui';
import { YEAR_PAGE_SIZE } from '../../utils';

type PrevButtonProps = {
  style?: Styles[UI.button_prev];
  imageStyle?: Styles[UI.button_prev_image];
};

const PrevButton = ({ style, imageStyle }: PrevButtonProps) => {
  const {
    currentYear,
    calendarView,
    onChangeMonth,
    onChangeYear,
    components = {},
    isRTL,
  } = useCalendarContext();

  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const defaultStyles = useMemo(() => createDefaultStyles(isRTL), [isRTL]);

  const onPress = useCallback(() => {
    switch (calendarView) {
      case 'day':
        return onChangeMonth(-1);
      case 'month':
        return onChangeYear(currentYear - 1);
      case 'year':
        return onChangeYear(currentYear - YEAR_PAGE_SIZE);
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
      testID="btn-prev"
      accessibilityRole="button"
      accessibilityLabel="Prev"
    >
      <View style={[defaultStyles.iconContainer, defaultStyles.prev, style]}>
        {components.IconPrev || <Icon as={ChevronLeftSmallIcon} style={iconStyle} />}
      </View>
    </Pressable>
  );
};

const customComparator = (prev: Readonly<PrevButtonProps>, next: Readonly<PrevButtonProps>) => {
  const areEqual = isEqual(prev.style, next.style) && isEqual(prev.imageStyle, next.imageStyle);

  return areEqual;
};

export default memo(PrevButton, customComparator);

const createDefaultStyles = (isRTL: boolean) =>
  StyleSheet.create({
    iconContainer: {
      padding: 4,
    },
    prev: {
      marginRight: isRTL ? 0 : 3,
      marginLeft: isRTL ? 3 : 0,
    },
    icon: {
      width: 14,
      height: 14,
      transform: [{ rotate: isRTL ? '180deg' : '0deg' }],
    },
  });
