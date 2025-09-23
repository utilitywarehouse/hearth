import React, { memo, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { isEqual } from '../../../utils';
import { BodyText } from '../../BodyText';
import { CONTAINER_HEIGHT, WEEKDAYS_HEIGHT } from '../enums';
import { CalendarComponents, CalendarDay, ClassNames, DateType, Styles } from '../types';

interface Props {
  day: CalendarDay;
  onSelectDate: (date: DateType) => void;
  containerHeight?: number;
  weekdaysHeight?: number;
  styles?: Styles;
  classNames?: ClassNames;
  components?: CalendarComponents;
}

export const EmptyDay = React.memo(() => {
  return <View style={styles.dayWrapper} />;
});

const Day = ({
  day,
  onSelectDate,
  containerHeight = CONTAINER_HEIGHT,
  weekdaysHeight = WEEKDAYS_HEIGHT,
}: Props) => {
  const {
    text,
    date,
    isDisabled,
    isCurrentMonth,
    isToday,
    isSelected,
    inRange,
    leftCrop,
    rightCrop,
    isStartOfWeek,
    isEndOfWeek,
    isCrop,
    inMiddle,
    rangeStart,
    rangeEnd,
  } = day;

  styles.useVariants({
    isToday,
    isSelected,
    isDisabled,
    isCurrentMonth,
    inMiddle,
    rangeStart,
    rangeEnd,
    isStartOfWeek,
    isEndOfWeek,
  });

  const RangeFill = useMemo(() => {
    if (!inRange) return null;
    if (!isCrop) {
      return <View style={[styles.rangeRoot]} />;
    }
    return (
      <>
        {leftCrop && <View style={[styles.rangeRoot, styles.leftCrop]} />}
        {rightCrop && <View style={[styles.rangeRoot, styles.rightCrop]} />}
      </>
    );
  }, [inRange, isCrop, leftCrop, rightCrop, styles.rangeRoot]);

  return (
    <View style={styles.dayWrapper}>
      <View style={[styles.dayCell(containerHeight, weekdaysHeight)]}>
        {RangeFill}
        <View style={[styles.indicator]} />
        <Pressable
          disabled={isDisabled}
          onPress={() => onSelectDate(date)}
          accessibilityRole="button"
          accessibilityLabel={text}
          style={[styles.dayContainer]}
        >
          <BodyText style={[styles.text]}>{text}</BodyText>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  dayWrapper: {
    width: `${99.9 / 7}%`,
    padding: 2,
    variants: {
      isDisabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
      isCurrentMonth: {
        false: {
          opacity: theme.opacity.disabled,
        },
      },
    },
    compoundVariants: [
      {
        isCurrentMonth: false,
        inMiddle: true,
        styles: {
          opacity: 1,
        },
      },
      {
        isCurrentMonth: false,
        rangeStart: true,
        styles: {
          opacity: 1,
        },
      },
      {
        isCurrentMonth: false,
        rangeEnd: true,
        styles: {
          opacity: 1,
        },
      },
    ],
  },
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.color.text.primary,
    variants: {
      isSelected: {
        true: {
          color: theme.color.text.inverted,
        },
      },
    },
  },
  indicator: {
    position: 'absolute',
    width: theme.components.datePicker.calendar.item.roundelWidth,
    height: theme.components.datePicker.calendar.item.roundelHeight,
    top: 34,
    left: '50%',
    transform: [{ translateX: -(theme.components.datePicker.calendar.item.roundelWidth / 2) }],
    borderRadius: theme.borderRadius.full,
    variants: {
      isToday: {
        true: {
          backgroundColor: theme.color.surface.brand.default,
        },
      },
      isSelected: {
        true: {},
      },
    },
    compoundVariants: [
      {
        isToday: true,
        isSelected: true,
        styles: {
          backgroundColor: theme.components.datePicker.calendar.item.roundelBackgroundColorInverted,
        },
      },
    ],
  },
  dayCell: (containerHeight: number, weekdaysHeight: number) => ({
    minHeight: (containerHeight - weekdaysHeight) / 6,
    borderRadius: theme.components.datePicker.calendar.item.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    variants: {
      isSelected: {
        true: {
          backgroundColor: theme.color.surface.brand.default,
        },
      },
      inMiddle: {
        true: {
          backgroundColor: theme.color.surface.brand.default,
        },
      },
      rangeStart: {
        true: {
          backgroundColor: theme.color.surface.brand.default,
        },
      },
      rangeEnd: {
        true: {
          backgroundColor: theme.color.surface.brand.default,
        },
      },
    },
  }),
  rangeWrapper: {
    flex: 1,
  },
  rangeRoot: {
    position: 'absolute',
    top: 0,
    left: -2,
    right: -2,
    bottom: 0,
    variants: {
      inMiddle: {
        true: {
          backgroundColor: theme.color.background.primary,
        },
      },
      isStartOfWeek: {
        true: {},
      },
      isEndOfWeek: {
        true: {},
      },
    },
  },
  leftCrop: { left: '50%' },
  rightCrop: { right: '50%' },
}));

const customComparator = (prev: Readonly<Props>, next: Readonly<Props>) => {
  const areEqual =
    isEqual(prev.day, next.day) &&
    prev.onSelectDate === next.onSelectDate &&
    prev.containerHeight === next.containerHeight &&
    isEqual(prev.styles, next.styles) &&
    isEqual(prev.classNames, next.classNames) &&
    isEqual(prev.components, next.components);

  return areEqual;
};

export default memo(Day, customComparator);
