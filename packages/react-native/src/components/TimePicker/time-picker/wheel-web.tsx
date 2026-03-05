import { memo, useCallback, useMemo } from 'react';
import { Platform, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { isEqual } from '../../../utils';
import { BodyText } from '../../BodyText';
import { DEFAULT_TIME_PICKER_HEIGHT } from '../constants';
import type { PickerOption } from '../TimePicker.props';

interface WheelProps {
  value: number | string;
  setValue?: (value: any) => void;
  items: PickerOption[];
}

const ITEM_HEIGHT = 44;

type WheelWebItemProps = {
  displayValue: PickerOption | undefined;
  index: number;
  currentIndex: number;
  translateY: SharedValue<number>;
  radius: number;
  displayCount: number;
  value: number | string;
};

const WheelWebItem = ({
  displayValue,
  index,
  currentIndex,
  translateY,
  radius,
  displayCount,
  value,
}: WheelWebItemProps) => {
  const baseOpacity = displayValue?.value !== value ? 0.3 : 1;

  const animatedStyle = useAnimatedStyle(() => {
    const offset = (radius * 2) / displayCount;
    const shifted = interpolate(
      translateY.value,
      [-radius, radius],
      [-radius + offset * (index - currentIndex), radius + offset * (index - currentIndex)],
      Extrapolate.EXTEND
    );
    const angle = interpolate(
      shifted,
      [-radius, radius],
      [-Math.PI / 2, Math.PI / 2],
      Extrapolate.CLAMP
    );
    const translate = radius * Math.sin(angle);
    const rotateX = (angle * 180) / Math.PI;

    return {
      position: 'absolute',
      height: ITEM_HEIGHT - 10,
      opacity: baseOpacity,
      transform: [{ translateY: translate }, { rotateX: `${rotateX}deg` }],
    };
  }, [baseOpacity, currentIndex, displayCount, index, radius, translateY]);

  return (
    <Animated.View style={animatedStyle}>
      <BodyText>{displayValue?.text}</BodyText>
    </Animated.View>
  );
};

const WheelWeb = ({ value, setValue = () => {}, items }: WheelProps) => {
  const displayCount = 5;
  const translateY = useSharedValue(0);
  const renderCount = displayCount * 2 < items.length ? displayCount * 8 : displayCount * 2 - 1;
  const circular = items.length >= displayCount;
  const height = 140;
  const radius = height / 2;

  const valueIndex = useMemo(() => {
    return Math.max(
      0,
      items.findIndex(item => item.value === value)
    );
  }, [items, value]);

  const handlePanEnd = useCallback(
    (deltaY: number) => {
      let newValueIndex = valueIndex - Math.round(deltaY / ((radius * 2) / displayCount));
      if (circular) {
        newValueIndex = (newValueIndex + items.length) % items.length;
      } else {
        if (newValueIndex < 0) {
          newValueIndex = 0;
        } else if (newValueIndex >= items.length) {
          newValueIndex = items.length - 1;
        }
      }
      const newValue = items[newValueIndex];
      if (newValue?.value === value) {
        return;
      }
      if (newValue?.value) {
        setValue(newValue.value);
      } else if (items[0]?.value) {
        setValue(items[0].value);
      }
    },
    [circular, displayCount, items, radius, setValue, value, valueIndex]
  );

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .onUpdate(event => {
          translateY.value = event.translationY;
        })
        .onEnd(event => {
          runOnJS(handlePanEnd)(event.translationY);
          translateY.value = 0;
        }),
    [handlePanEnd, translateY]
  );

  const displayValues = useMemo(() => {
    const centerIndex = Math.floor(renderCount / 2);

    return Array.from({ length: renderCount }, (_, index) => {
      let targetIndex = valueIndex + index - centerIndex;
      if (circular) {
        targetIndex = ((targetIndex % items.length) + items.length) % items.length;
      } else {
        targetIndex = Math.max(0, Math.min(targetIndex, items.length - 1));
      }
      return items[targetIndex] || items[0];
    });
  }, [renderCount, valueIndex, items, circular]);

  const currentIndex = Math.max(
    0,
    displayValues.findIndex(item => item?.value === value)
  );

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.container}>
        <View
          style={[
            styles.selectedIndicator,
            {
              transform: [{ translateY: -ITEM_HEIGHT / 2 }],
              height: ITEM_HEIGHT,
            },
          ]}
        />
        {displayValues?.map((displayValue, index) => (
          <WheelWebItem
            key={`${displayValue?.text}-${index}`}
            displayValue={displayValue}
            index={index}
            currentIndex={currentIndex}
            translateY={translateY}
            radius={radius}
            displayCount={displayCount}
            value={value}
          />
        ))}
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 30,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: DEFAULT_TIME_PICKER_HEIGHT / 2,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        userSelect: 'none',
      },
    }),
  },
  selectedIndicator: {
    position: 'absolute',
    width: '100%',
    top: '50%',
  },
});

const customComparator = (prev: Readonly<WheelProps>, next: Readonly<WheelProps>) => {
  const areEqual =
    prev.value === next.value && prev.setValue === next.setValue && isEqual(prev.items, next.items);

  return areEqual;
};

export default memo(WheelWeb, customComparator);
