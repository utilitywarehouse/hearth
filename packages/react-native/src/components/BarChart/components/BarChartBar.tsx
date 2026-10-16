import React, { useEffect } from 'react';
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Path } from 'react-native-svg';
import useTheme from '../../../hooks/useTheme';
import {
  ANIMATION_TIMING,
  BAR_RADIUS,
  BAR_STROKE_WIDTH,
  FILL_FADE_TIMING,
  IS_WEB,
} from '../BarChart.constants';
import { getBarHeight, getRoundedTopBarPath } from '../BarChart.utils';

const AnimatedPath = Animated.createAnimatedComponent(Path as React.ComponentType<any>);

interface BarChartBarProps {
  x: number;
  width: number;
  baselineY: number;
  plotHeight: number;
  value: number;
  yMax: number;
  isSelected: boolean;
  isReducedMotion: boolean;
}

const BarChartBar = ({
  x,
  width,
  baselineY,
  plotHeight,
  value,
  yMax,
  isSelected,
  isReducedMotion,
}: BarChartBarProps) => {
  const { color } = useTheme();
  const fill = color.surface.cashback.default;
  const selectedFill = color.surface.brand.default;
  const displayValue = useSharedValue(isReducedMotion ? value : 0);

  useEffect(() => {
    displayValue.value = isReducedMotion ? value : withTiming(value, ANIMATION_TIMING);
  }, [value, isReducedMotion, displayValue]);

  const selectedProgress = useSharedValue(isSelected ? 1 : 0);

  useEffect(() => {
    const target = isSelected ? 1 : 0;
    selectedProgress.value = isReducedMotion ? target : withTiming(target, FILL_FADE_TIMING);
  }, [isSelected, isReducedMotion, selectedProgress]);

  const animatedProps = useAnimatedProps((): { d: string; fill?: string } => {
    const d = getRoundedTopBarPath({
      x,
      baselineY,
      width,
      height: getBarHeight(displayValue.value, yMax, plotHeight),
      radius: BAR_RADIUS,
      strokeWidth: BAR_STROKE_WIDTH,
    });
    // react-native-web does not apply an animated fill, so web sets it as a plain prop below.
    return IS_WEB
      ? { d }
      : { d, fill: interpolateColor(selectedProgress.value, [0, 1], [fill, selectedFill]) };
  });

  return (
    <AnimatedPath
      animatedProps={animatedProps}
      fill={IS_WEB ? (isSelected ? selectedFill : fill) : undefined}
      stroke={color.border.strong}
      strokeWidth={BAR_STROKE_WIDTH}
      strokeLinejoin="round"
    />
  );
};

BarChartBar.displayName = 'BarChartBar';

export default BarChartBar;
