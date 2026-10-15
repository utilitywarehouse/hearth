import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Path } from 'react-native-svg';
import {
  ANIMATION_TIMING,
  BAR_RADIUS,
  BAR_STROKE_WIDTH,
  FILL_FADE_TIMING,
} from './BarChart.constants';
import { getBarHeight, getRoundedTopBarPath } from './BarChart.utils';

const isWeb = Platform.OS === 'web';

const AnimatedPath = Animated.createAnimatedComponent(Path as React.ComponentType<any>);

interface BarChartBarProps {
  x: number;
  width: number;
  baselineY: number;
  plotHeight: number;
  value: number;
  yMax: number;
  selected: boolean;
  isReducedMotion: boolean;
  fill: string;
  selectedFill: string;
  stroke: string;
}

const BarChartBar = ({
  x,
  width,
  baselineY,
  plotHeight,
  value,
  yMax,
  selected,
  isReducedMotion,
  fill,
  selectedFill,
  stroke,
}: BarChartBarProps) => {
  const displayValue = useSharedValue(isReducedMotion ? value : 0);

  useEffect(() => {
    displayValue.value = isReducedMotion ? value : withTiming(value, ANIMATION_TIMING);
  }, [value, isReducedMotion, displayValue]);

  const selectedProgress = useSharedValue(selected ? 1 : 0);

  useEffect(() => {
    const target = selected ? 1 : 0;
    selectedProgress.value = isReducedMotion ? target : withTiming(target, FILL_FADE_TIMING);
  }, [selected, isReducedMotion, selectedProgress]);

  const animatedProps = useAnimatedProps((): { d: string; fill?: string } => {
    const d = getRoundedTopBarPath(
      x,
      baselineY,
      width,
      getBarHeight(displayValue.value, yMax, plotHeight),
      BAR_RADIUS,
      BAR_STROKE_WIDTH
    );
    // react-native-web does not apply an animated fill, so web sets it as a plain prop below.
    return isWeb
      ? { d }
      : { d, fill: interpolateColor(selectedProgress.value, [0, 1], [fill, selectedFill]) };
  });

  return (
    <AnimatedPath
      animatedProps={animatedProps}
      fill={isWeb ? (selected ? selectedFill : fill) : undefined}
      stroke={stroke}
      strokeWidth={BAR_STROKE_WIDTH}
      strokeLinejoin="round"
    />
  );
};

BarChartBar.displayName = 'BarChartBar';

export default BarChartBar;
