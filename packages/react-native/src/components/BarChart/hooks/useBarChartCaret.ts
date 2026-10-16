import { useEffect, useRef } from 'react';
import {
  useAnimatedStyle,
  useScrollOffset,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type Animated from 'react-native-reanimated';
import type { AnimatedRef } from 'react-native-reanimated';
import { ANIMATION_TIMING, CARET_HEIGHT, CARET_WIDTH } from '../BarChart.constants';
import { clamp, getCaretMotion } from '../BarChart.utils';

interface UseBarChartCaretOptions {
  scrollRef: AnimatedRef<Animated.ScrollView>;
  activeIndex: number | null;
  bandWidth: number;
  viewportWidth: number;
  yAxisWidth: number;
  isReducedMotion: boolean;
}

/**
 * Animated style that keeps the tooltip caret over the selected bar: it reveals from under the
 * tooltip the first time, then slides or snaps to the bar, follows the scroll offset and stays
 * clamped inside the chart.
 */
export const useBarChartCaret = ({
  scrollRef,
  activeIndex,
  bandWidth,
  viewportWidth,
  yAxisWidth,
  isReducedMotion,
}: UseBarChartCaretOptions) => {
  const scrollOffset = useScrollOffset(scrollRef);
  const hasPositionedCaret = useRef(false);
  const previousBandWidth = useRef<number | null>(null);
  const selectedCenter = useSharedValue(0);
  // 0 tucks the caret under the tooltip, 1 shows it below.
  const caretReveal = useSharedValue(0);
  const chartWidth = yAxisWidth + viewportWidth;

  useEffect(() => {
    // Wait for layout and a selection so the caret never travels from its initial position.
    if (viewportWidth === 0 || yAxisWidth === 0 || activeIndex === null) {
      return;
    }
    const target = activeIndex * bandWidth + bandWidth / 2;
    const motion = getCaretMotion({
      hasPositioned: hasPositionedCaret.current,
      bandWidthChanged: previousBandWidth.current !== bandWidth,
      isReducedMotion,
    });
    hasPositionedCaret.current = true;
    previousBandWidth.current = bandWidth;

    if (motion === 'reveal') {
      // Move into place while tucked under the tooltip, then slide out from under it.
      selectedCenter.value = target;
      caretReveal.value = isReducedMotion ? 1 : withTiming(1, ANIMATION_TIMING);
    } else if (motion === 'snap') {
      selectedCenter.value = target;
    } else {
      selectedCenter.value = withTiming(target, ANIMATION_TIMING);
    }
  }, [
    activeIndex,
    bandWidth,
    isReducedMotion,
    viewportWidth,
    yAxisWidth,
    selectedCenter,
    caretReveal,
  ]);

  return useAnimatedStyle(() => {
    const centerInViewport = selectedCenter.value - scrollOffset.value;
    const isVisible =
      centerInViewport >= -bandWidth / 2 && centerInViewport <= viewportWidth + bandWidth / 2;
    const caretCenter = clamp(
      yAxisWidth + centerInViewport,
      yAxisWidth + CARET_WIDTH,
      chartWidth - CARET_WIDTH
    );
    return {
      opacity: isVisible ? 1 : 0,
      transform: [
        { translateX: caretCenter - CARET_WIDTH / 2 },
        { translateY: (1 - caretReveal.value) * -CARET_HEIGHT },
      ],
    };
  });
};
