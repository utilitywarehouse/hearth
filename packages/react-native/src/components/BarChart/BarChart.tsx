import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { type LayoutChangeEvent, Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Line, Svg } from 'react-native-svg';
import { StyleSheet } from 'react-native-unistyles';
import { useReducedMotionEnabled } from '../../hooks/useReducedMotionEnabled';
import useTheme from '../../hooks/useTheme';
import { BodyText } from '../BodyText';
import {
  AXIS_LABEL_HEIGHT,
  BAR_STROKE_WIDTH,
  CARET_HEIGHT,
  GRIDLINE_DASH,
  PLOT_TOP_INSET,
  TOOLTIP_GAP,
  X_LABEL_GAP,
} from './BarChart.constants';
import type { BarChartDatum, BarChartProps } from './BarChart.props';
import { DEFAULT_Y_TICKS, getBandWidth, getYMax, getYTicks } from './BarChart.utils';
import BarChartBar from './components/BarChartBar';
import BarChartTooltip from './components/BarChartTooltip';
import BarChartYAxis from './components/BarChartYAxis';
import { useBarChartAnnouncement } from './hooks/useBarChartAnnouncement';
import { useBarChartCaret } from './hooks/useBarChartCaret';
import { useBarChartScrollSync } from './hooks/useBarChartScrollSync';
import { useBarChartSelection } from './hooks/useBarChartSelection';

const createWidthHandler =
  (setWidth: Dispatch<SetStateAction<number>>) => (event: LayoutChangeEvent) => {
    const nextWidth = event.nativeEvent.layout.width;
    setWidth(currentWidth => (currentWidth === nextWidth ? currentWidth : nextWidth));
  };

/**
 * Compares values across categories with one bar each. Tap a bar to select it and see its value in
 * a tooltip. Scrolls horizontally when the bars need more space than is available, keeping the
 * y-axis in view.
 */
const BarChart = ({
  data,
  dataId,
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

  const [viewportWidth, setViewportWidth] = useState(0);
  const [yAxisWidth, setYAxisWidth] = useState(0);
  const { activeIndex, select } = useBarChartSelection({
    selectedIndex,
    defaultSelectedIndex,
    length: data.length,
    dataId,
  });
  const activeDatum = activeIndex === null ? undefined : data[activeIndex];

  const formatTooltip = formatTooltipValue ?? formatYLabel;
  const describeDatum = (datum: BarChartDatum) =>
    `${datum.tooltipLabel ?? datum.label}, ${formatTooltip(datum.value)}`;
  const axisMax = getYMax(
    data.map(datum => datum.value),
    yTicks,
    yMax
  );
  const ticks = getYTicks(axisMax, yTicks);
  const bandWidth = getBandWidth(data.length, viewportWidth, barWidth);
  const contentWidth = bandWidth * data.length;
  const baselineY = PLOT_TOP_INSET + height;
  const svgHeight = height + AXIS_LABEL_HEIGHT;
  const contentHeight = baselineY + X_LABEL_GAP + AXIS_LABEL_HEIGHT;

  const { scrollRef, handleContentSizeChange } = useBarChartScrollSync({
    dataId,
    viewportWidth,
    contentWidth,
  });
  const caretStyle = useBarChartCaret({
    scrollRef,
    activeIndex,
    bandWidth,
    viewportWidth,
    yAxisWidth,
    isReducedMotion,
  });
  useBarChartAnnouncement(activeIndex, activeDatum ? describeDatum(activeDatum) : undefined);

  const handleViewportLayout = createWidthHandler(setViewportWidth);
  const handleYAxisLayout = createWidthHandler(setYAxisWidth);

  const handlePress = (index: number) => {
    select(index);
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
          onContentSizeChange={handleContentSizeChange}
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
                  // A new dataset remounts the bars so they grow from 0 instead of from the old values.
                  key={`${dataId}-${datum.label}-${index}`}
                  x={index * bandWidth + (bandWidth - barWidth) / 2}
                  width={barWidth}
                  baselineY={baselineY}
                  plotHeight={height}
                  value={datum.value}
                  yMax={axisMax}
                  isSelected={index === activeIndex}
                  isReducedMotion={isReducedMotion}
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
                    key={`${datum.label}-${index}`}
                    role="radio"
                    aria-checked={selected}
                    aria-label={describeDatum(datum)}
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
