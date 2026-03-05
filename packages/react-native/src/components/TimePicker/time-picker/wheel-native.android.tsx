import { memo, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Defs, LinearGradient, Rect, Stop, Svg } from 'react-native-svg';
import { StyleSheet } from 'react-native-unistyles';
import { useTheme } from '../../../hooks';
import { BodyText } from '../../BodyText';
import type { PickerOption } from '../TimePicker.props';

interface WheelProps {
  value: number | string;
  setValue?: (value: any) => void;
  items: PickerOption[];
}

const ITEM_HEIGHT = 40;
const VISIBLE_REST = 2;
const ITEM_SPACING_FACTOR = 0.7;

type WheelItemProps = {
  displayValue: PickerOption | undefined;
  index: number;
  currentIndex: number;
  translateY: SharedValue<number>;
  radius: number;
  displayCount: number;
  value: number | string;
};

const WheelItem = ({
  displayValue,
  index,
  currentIndex,
  translateY,
  radius,
  displayCount,
  value,
}: WheelItemProps) => {
  const baseOpacity = displayValue?.value !== value ? 0.3 : 1;

  const animatedStyle = useAnimatedStyle(() => {
    const offset = ((radius * 2) / displayCount) * ITEM_SPACING_FACTOR;
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
      <BodyText size="lg">{displayValue?.text}</BodyText>
    </Animated.View>
  );
};

const clampIndex = (value: number, max: number) => Math.max(0, Math.min(max, value));

const WheelNative = ({ value, setValue = () => {}, items }: WheelProps) => {
  const theme = useTheme();
  const fadeHeight = ITEM_HEIGHT * 1.5;
  const gradientId = useMemo(() => `wheel-fade-${Math.random().toString(36).slice(2)}`, []);
  const displayCount = VISIBLE_REST * 2 + 1;
  const translateY = useSharedValue(0);
  const renderCount = displayCount * 2 < items.length ? displayCount * 4 : displayCount * 2 - 1;
  const height = ITEM_HEIGHT * displayCount;
  const radius = height / 2;
  const stepSize = ((radius * 2) / displayCount) * ITEM_SPACING_FACTOR;

  const valueIndex = useMemo(() => {
    return Math.max(
      0,
      items.findIndex(item => item.value === value)
    );
  }, [items, value]);

  const commitSelection = useCallback(
    (translationY: number, velocityY: number) => {
      const projectedTranslation = translationY + velocityY * 0.05;
      const baseSteps = Math.round(projectedTranslation / stepSize);
      const nextIndex = clampIndex(valueIndex - baseSteps, items.length - 1);

      const nextValue = items[nextIndex];
      if (nextValue?.value === value) {
        return;
      }
      if (nextValue && nextValue.value !== undefined) {
        setValue(nextValue.value);
      }
    },
    [items, setValue, value, valueIndex, stepSize]
  );

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .onUpdate(event => {
          translateY.value = event.translationY;
        })
        .onEnd(event => {
          runOnJS(commitSelection)(event.translationY, event.velocityY);
          translateY.value = withTiming(0, { duration: 120 });
        }),
    [commitSelection, translateY]
  );

  const displayValues = useMemo(() => {
    const centerIndex = Math.floor(renderCount / 2);

    return Array.from({ length: renderCount }, (_, index) => {
      const targetIndex = valueIndex + index - centerIndex;
      if (targetIndex < 0 || targetIndex >= items.length) {
        return undefined;
      }
      return items[targetIndex];
    });
  }, [renderCount, valueIndex, items]);

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
        {displayValues.map((displayValue, index) => (
          <WheelItem
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
        <View pointerEvents="none" style={[styles.fadeOverlay, { height: fadeHeight }]}>
          <Svg width="100%" height="100%" preserveAspectRatio="none">
            <Defs>
              <LinearGradient id={`${gradientId}-top`} x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={theme.color.background.secondary} stopOpacity={1} />
                <Stop offset="1" stopColor={theme.color.background.secondary} stopOpacity={0} />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill={`url(#${gradientId}-top)`} />
          </Svg>
        </View>
        <View
          pointerEvents="none"
          style={[styles.fadeOverlay, styles.fadeOverlayBottom, { height: fadeHeight }]}
        >
          <Svg width="100%" height="100%" preserveAspectRatio="none">
            <Defs>
              <LinearGradient id={`${gradientId}-bottom`} x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={theme.color.background.secondary} stopOpacity={0} />
                <Stop offset="1" stopColor={theme.color.background.secondary} stopOpacity={1} />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill={`url(#${gradientId}-bottom)`} />
          </Svg>
        </View>
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    minWidth: theme.components.timePicker.time.item.width,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: ITEM_HEIGHT * (VISIBLE_REST * 2 + 1),
  },
  selectedIndicator: {
    position: 'absolute',
    width: theme.components.timePicker.time.item.width,
    height: ITEM_HEIGHT,
    top: 96,
    backgroundColor: theme.color.interactive.neutral.surface.subtle.active,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  fadeOverlayBottom: {
    top: undefined,
    bottom: 0,
  },
}));

export default memo(WheelNative);
