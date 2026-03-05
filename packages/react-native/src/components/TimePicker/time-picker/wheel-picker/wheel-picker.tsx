import React, { useEffect, useMemo, useRef } from 'react';
import {
  FlatListProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  type SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../../../BodyText';
import type { PickerOption } from '../../TimePicker.props';

interface ItemProps {
  style: StyleProp<ViewStyle>;
  option: PickerOption | null;
  height: number;
  index: number;
  scrollY: SharedValue<number>;
  visibleRest: number;
  rotationFunction: (x: number) => number;
  opacityFunction: (x: number) => number;
  scaleFunction: (x: number) => number;
}

const WheelPickerItem: React.FC<ItemProps> = ({
  style,
  height,
  option,
  index,
  visibleRest,
  scrollY,
  opacityFunction,
  rotationFunction,
  scaleFunction,
}) => {
  const inputRange = useMemo(() => {
    const range = [0];
    for (let i = 1; i <= visibleRest + 1; i++) {
      range.unshift(-i);
      range.push(i);
    }
    return range;
  }, [visibleRest]);

  const translateYRange = useMemo(() => {
    const range = [0];
    for (let i = 1; i <= visibleRest + 1; i++) {
      let y = (height / 2) * (1 - Math.sin(Math.PI / 2 - rotationFunction(i)));
      for (let j = 1; j < i; j++) {
        y += height * (1 - Math.sin(Math.PI / 2 - rotationFunction(j)));
      }
      range.unshift(y);
      range.push(-y);
    }
    return range;
  }, [height, rotationFunction, visibleRest]);

  const opacityRange = useMemo(() => {
    const range = [1];
    for (let x = 1; x <= visibleRest + 1; x++) {
      const y = opacityFunction(x);
      range.unshift(y);
      range.push(y);
    }
    return range;
  }, [opacityFunction, visibleRest]);

  const scaleRange = useMemo(() => {
    const range = [1.0];
    for (let x = 1; x <= visibleRest + 1; x++) {
      const y = scaleFunction(x);
      range.unshift(y);
      range.push(y);
    }
    return range;
  }, [scaleFunction, visibleRest]);

  const rotateXRange = useMemo(() => {
    const range = [0];
    for (let x = 1; x <= visibleRest + 1; x++) {
      const y = rotationFunction(x);
      range.unshift(y);
      range.push(y);
    }
    return range;
  }, [rotationFunction, visibleRest]);

  const animatedStyle = useAnimatedStyle(() => {
    const relativeIndex = index - (scrollY.value / height + visibleRest);
    const translateY = interpolate(relativeIndex, inputRange, translateYRange, Extrapolate.CLAMP);
    const opacity = interpolate(relativeIndex, inputRange, opacityRange, Extrapolate.CLAMP);
    const scale = interpolate(relativeIndex, inputRange, scaleRange, Extrapolate.CLAMP);
    const rotateX = interpolate(relativeIndex, inputRange, rotateXRange, Extrapolate.CLAMP);

    return {
      opacity,
      transform: [{ translateY }, { rotateX: `${rotateX}deg` }, { scale }],
    };
  }, [
    height,
    index,
    inputRange,
    opacityRange,
    rotateXRange,
    scaleRange,
    translateYRange,
    scrollY,
    visibleRest,
  ]);

  return (
    <Animated.View style={[styles.option, style, { height }, animatedStyle]}>
      <BodyText size="lg">{option?.text}</BodyText>
    </Animated.View>
  );
};

interface Props {
  value: number | string;
  options: PickerOption[];
  onChange: (index: number | string) => void;
  selectedIndicatorStyle?: StyleProp<ViewStyle>;
  itemStyle?: ViewStyle;
  itemHeight?: number;
  containerStyle?: ViewStyle;
  containerProps?: Omit<ViewProps, 'style'>;
  scaleFunction?: (x: number) => number;
  rotationFunction?: (x: number) => number;
  opacityFunction?: (x: number) => number;
  visibleRest?: number;
  decelerationRate?: 'normal' | 'fast' | number;
  flatListProps?: Omit<FlatListProps<PickerOption | null>, 'data' | 'renderItem'>;
}

const WheelPicker: React.FC<Props> = ({
  value,
  options,
  onChange,
  selectedIndicatorStyle = {},
  containerStyle = {},
  itemStyle = {},
  itemHeight = 40,
  scaleFunction = (x: number) => 1.0 ** x,
  rotationFunction = (x: number) => 1 - Math.pow(1 / 2, x),
  opacityFunction = (x: number) => Math.pow(1 / 3, x),
  visibleRest = 3,
  decelerationRate = 'normal',
  containerProps = {},
  flatListProps = {},
}) => {
  const momentumStarted = useRef(false);
  const selectedIndex = options.findIndex(item => item.value === value);

  const flatListRef = useRef<any>(null);
  const scrollY = useSharedValue(selectedIndex * itemHeight);

  const containerHeight = (1 + visibleRest * 2) * itemHeight;
  const paddedOptions = useMemo(() => {
    const array: (PickerOption | null)[] = [...options];
    for (let i = 0; i < visibleRest; i++) {
      array.unshift(null);
      array.push(null);
    }
    return array;
  }, [options, visibleRest]);

  const offsets = useMemo(
    () => [...Array(paddedOptions.length)].map((_, i) => i * itemHeight),
    [paddedOptions, itemHeight]
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = Math.min(
      itemHeight * (options.length - 1),
      Math.max(event.nativeEvent.contentOffset.y, 0)
    );

    let index = Math.floor(offsetY / itemHeight);
    const remainder = offsetY % itemHeight;
    if (remainder > itemHeight / 2) {
      index++;
    }

    if (index !== selectedIndex) {
      onChange(options[index]?.value || 0);
    }
  };

  const handleMomentumScrollBegin = () => {
    momentumStarted.current = true;
  };

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    momentumStarted.current = false;
    handleScrollEnd(event);
  };

  const handleScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset?.y;

    setTimeout(() => {
      if (!momentumStarted.current && offsetY !== undefined) {
        const syntheticEvent = {
          nativeEvent: {
            contentOffset: { y: offsetY },
          },
        };
        handleScrollEnd(syntheticEvent as any);
      }
    }, 50);
  };

  useEffect(() => {
    if (selectedIndex < 0 || selectedIndex >= options.length) {
      throw new Error(
        `Selected index ${selectedIndex} is out of bounds [0, ${options.length - 1}]`
      );
    }
  }, [selectedIndex, options]);

  useEffect(() => {
    scrollY.value = selectedIndex * itemHeight;
    flatListRef.current?.scrollToIndex({
      index: selectedIndex,
      animated: Platform.OS === 'ios',
    });
  }, [selectedIndex, itemHeight, scrollY, flatListRef]);

  return (
    <View
      style={[styles.container, { height: containerHeight }, containerStyle]}
      {...containerProps}
    >
      <View
        style={[
          styles.selectedIndicator,
          selectedIndicatorStyle,
          {
            transform: [{ translateY: -itemHeight / 2 }],
            height: itemHeight,
          },
        ]}
      />
      <Animated.FlatList<PickerOption | null>
        {...(flatListProps as any)}
        ref={flatListRef}
        nestedScrollEnabled
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        onScrollEndDrag={handleScrollEndDrag}
        onMomentumScrollBegin={handleMomentumScrollBegin}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        snapToOffsets={offsets}
        decelerationRate={decelerationRate}
        disableIntervalMomentum
        initialScrollIndex={selectedIndex}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        data={paddedOptions}
        keyExtractor={(item: PickerOption | null, index: number) =>
          item ? `${item.value}-${item.text}-${index}` : `null-${index}`
        }
        renderItem={({ item: option, index }: { item: PickerOption | null; index: number }) => (
          <WheelPickerItem
            key={`option-${index}`}
            index={index}
            option={option}
            style={itemStyle}
            height={itemHeight}
            scrollY={scrollY}
            scaleFunction={scaleFunction}
            rotationFunction={rotationFunction}
            opacityFunction={opacityFunction}
            visibleRest={visibleRest}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    position: 'relative',
    height: 400,
  },
  selectedIndicator: {
    position: 'absolute',
    width: theme.components.timePicker.time.item.width,
    height: theme.components.timePicker.time.item.height,
    top: '50%',
    backgroundColor: theme.color.interactive.neutral.surface.subtle.active,
    borderRadius: theme.borderRadius.md,
  },
  scrollView: {
    overflow: 'hidden',
    flex: 1,
    height: 400,
  },
  option: {
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.components.timePicker.time.item.width,
    height: theme.components.timePicker.time.item.height,
    zIndex: 100,
  },
}));

export default WheelPicker;
