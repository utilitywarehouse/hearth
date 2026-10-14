import { useEffect, useRef, useState } from 'react';
import { type LayoutChangeEvent, Pressable, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Line, Svg } from 'react-native-svg';
import { StyleSheet } from 'react-native-unistyles';
import { useReducedMotionEnabled } from '../../hooks/useReducedMotionEnabled';
import useTheme from '../../hooks/useTheme';
import { BodyText } from '../BodyText';
import {
  ANIMATION_DURATION,
  AXIS_LABEL_HEIGHT,
  BAR_STROKE_WIDTH,
  CARET_HEIGHT,
  CARET_WIDTH,
  GRIDLINE_DASH,
  MIN_BAR_GAP,
  PLOT_TOP_INSET,
  TOOLTIP_GAP,
  X_LABEL_GAP,
} from './BarChart.constants';
import type { BarChartProps } from './BarChart.props';
import {
  clamp,
  DEFAULT_Y_TICKS,
  getBandWidth,
  getYMax,
  getYTicks,
  resolveSelectedIndex,
} from './BarChart.utils';
import BarChartBar from './BarChartBar';
import BarChartTooltip from './BarChartTooltip';
import BarChartYAxis from './BarChartYAxis';

/**
 * Compares values across categories with one bar each. Tap a bar to select it and see its value in
 * a tooltip. Scrolls horizontally when the bars need more space than is available, keeping the
 * y-axis in view.
 */
const BarChart = ({
  data,
  height = 288,
  barWidth = 48,
  yTicks = DEFAULT_Y_TICKS,
  yMax,
  formatYLabel = String,
  formatTooltipValue,
  selectedIndex,
  defaultSelectedIndex,
  onSelectedChange,
  style,
  ...props
}: BarChartProps) => {
  const { color } = useTheme();
  const isReducedMotion = useReducedMotionEnabled();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);
  const hasScrolledToEnd = useRef(false);
  const hasPositionedCaretRef = useRef(false);
  const selectedCenter = useSharedValue(0);
  // 0 tucks the caret under the tooltip, 1 shows it below.
  const caretReveal = useSharedValue(0);

  const [viewportWidth, setViewportWidth] = useState(0);
  const [yAxisWidth, setYAxisWidth] = useState(0);
  const [internalSelected, setInternalSelected] = useState(defaultSelectedIndex);

  const isControlled = selectedIndex !== undefined;
  const rawSelected = isControlled
    ? selectedIndex
    : internalSelected === undefined
      ? data.length - 1
      : internalSelected;
  const activeIndex = resolveSelectedIndex(rawSelected, data.length);
  const activeDatum = activeIndex === null ? undefined : data[activeIndex];

  const formatTooltip = formatTooltipValue ?? formatYLabel;
  const axisMax = getYMax(
    data.map(datum => datum.value),
    yTicks,
    yMax
  );
  const ticks = getYTicks(axisMax, yTicks);
  const bandWidth = getBandWidth(data.length, viewportWidth, barWidth, MIN_BAR_GAP);
  const contentWidth = bandWidth * data.length;
  const baselineY = PLOT_TOP_INSET + height;
  const svgHeight = height + AXIS_LABEL_HEIGHT;
  const contentHeight = baselineY + X_LABEL_GAP + AXIS_LABEL_HEIGHT;
  const chartWidth = yAxisWidth + viewportWidth;

  useEffect(() => {
    // Wait for layout and a selection so the caret never travels from its initial position.
    if (viewportWidth === 0 || yAxisWidth === 0 || activeIndex === null) {
      return;
    }
    const target = activeIndex * bandWidth + bandWidth / 2;
    const timing = { duration: ANIMATION_DURATION, easing: Easing.out(Easing.ease) };
    if (!hasPositionedCaretRef.current) {
      hasPositionedCaretRef.current = true;
      // Move into place while tucked under the tooltip, then slide out from under it.
      selectedCenter.value = target;
      caretReveal.value = isReducedMotion ? 1 : withTiming(1, timing);
    } else if (isReducedMotion) {
      selectedCenter.value = target;
    } else {
      selectedCenter.value = withTiming(target, timing);
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

  useEffect(() => {
    if (hasScrolledToEnd.current || viewportWidth === 0 || contentWidth <= viewportWidth) {
      return;
    }
    hasScrolledToEnd.current = true;
    scrollRef.current?.scrollToEnd({ animated: false });
  }, [viewportWidth, contentWidth, scrollRef]);

  const caretStyle = useAnimatedStyle(() => {
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

  const handleViewportLayout = (event: LayoutChangeEvent) => {
    const nextWidth = event.nativeEvent.layout.width;
    setViewportWidth(currentWidth => (currentWidth === nextWidth ? currentWidth : nextWidth));
  };

  const handleYAxisLayout = (event: LayoutChangeEvent) => {
    const nextWidth = event.nativeEvent.layout.width;
    setYAxisWidth(currentWidth => (currentWidth === nextWidth ? currentWidth : nextWidth));
  };

  const handlePress = (index: number) => {
    if (!isControlled) {
      setInternalSelected(index);
    }
    onSelectedChange?.(index, data[index]);
  };

  return (
    <View {...props} style={[styles.root, style]}>
      {activeDatum ? (
        <BarChartTooltip
          label={activeDatum.tooltipLabel ?? activeDatum.label}
          value={formatTooltip(activeDatum.value)}
          caretStyle={caretStyle}
        />
      ) : null}
      <View style={styles.chart}>
        <BarChartYAxis
          ticks={ticks}
          plotHeight={height}
          formatLabel={formatYLabel}
          onLayout={handleYAxisLayout}
        />
        <Animated.ScrollView
          ref={scrollRef}
          alwaysBounceHorizontal={false}
          bounces={false}
          horizontal
          nestedScrollEnabled
          onLayout={handleViewportLayout}
          overScrollMode="never"
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          style={styles.scroll}
        >
          <View style={{ width: contentWidth, height: contentHeight }}>
            <Svg aria-hidden width={contentWidth} height={svgHeight} style={styles.svg}>
              {ticks.slice(1).map(tick => {
                const y = baselineY - (tick / axisMax) * height;
                return (
                  <Line
                    key={tick}
                    x1={0}
                    x2={contentWidth}
                    y1={y}
                    y2={y}
                    stroke={color.border.subtle}
                    strokeWidth={1}
                    strokeDasharray={GRIDLINE_DASH}
                  />
                );
              })}
              {data.map((datum, index) => (
                <BarChartBar
                  key={datum.label}
                  x={index * bandWidth + (bandWidth - barWidth) / 2}
                  width={barWidth}
                  baselineY={baselineY}
                  plotHeight={height}
                  value={datum.value}
                  yMax={axisMax}
                  selected={index === activeIndex}
                  isReducedMotion={isReducedMotion}
                  fill={color.surface.cashback.default}
                  selectedFill={color.surface.brand.default}
                  stroke={color.border.strong}
                />
              ))}
              <Line
                x1={0}
                x2={contentWidth}
                y1={baselineY}
                y2={baselineY}
                stroke={color.border.strong}
                strokeWidth={BAR_STROKE_WIDTH}
              />
            </Svg>
            <View role="radiogroup" style={styles.bands}>
              {data.map((datum, index) => {
                const selected = index === activeIndex;
                return (
                  <Pressable
                    key={datum.label}
                    role="radio"
                    aria-checked={selected}
                    aria-label={`${datum.tooltipLabel ?? datum.label}, ${formatTooltip(datum.value)}`}
                    onPress={() => handlePress(index)}
                    style={[styles.band, { width: bandWidth }]}
                  >
                    <BodyText
                      size="sm"
                      weight={selected ? 'semibold' : 'regular'}
                      numberOfLines={1}
                      style={styles.xLabel}
                    >
                      {datum.label}
                    </BodyText>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </Animated.ScrollView>
      </View>
    </View>
  );
};

BarChart.displayName = 'BarChart';

const styles = StyleSheet.create(theme => ({
  root: {
    width: '100%',
    gap: TOOLTIP_GAP + CARET_HEIGHT,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  scroll: {
    flex: 1,
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bands: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  band: {
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    _web: {
      cursor: 'pointer',
      '_focus-visible': {
        outlineStyle: 'solid',
        outlineWidth: 2,
        outlineColor: theme.color.focus.primary,
        outlineOffset: -2,
      },
    },
  },
  xLabel: {
    height: AXIS_LABEL_HEIGHT,
    textAlign: 'center',
  },
}));

export default BarChart;
