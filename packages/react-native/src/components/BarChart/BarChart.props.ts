import type { ViewProps } from 'react-native';

export interface BarChartDatum {
  /**
   * Short label shown beneath the bar, e.g. `Sep 25`.
   */
  label: string;
  /**
   * The value the bar represents.
   */
  value: number;
  /**
   * Longer label shown in the tooltip when the bar is selected, e.g. `September`.
   * Falls back to `label`.
   */
  tooltipLabel?: string;
}

export type BarChartColorScheme =
  | 'info'
  | 'positive'
  | 'danger'
  | 'warning'
  | 'functional'
  | 'energy'
  | 'broadband'
  | 'mobile'
  | 'insurance'
  | 'cashback'
  | 'pig';

export interface BarChartProps extends ViewProps {
  /**
   * The colour scheme of the bars. Unselected bars use the subtle colour and the selected bar uses
   * the emphasis colour.
   * @default 'info'
   */
  colorScheme?: BarChartColorScheme;
  /**
   * The data points to plot, one bar each.
   */
  data: BarChartDatum[];
  /**
   * Identifies the dataset and must be unique to it, e.g. `2025`. When it changes, the chart scrolls to
   * the newest bar. Updating `data` while keeping the same `dataId` leaves the scroll position alone.
   */
  dataId: string;
  /**
   * Height of the plot area (the bars and gridlines) in dp. The x-axis labels and tooltip sit outside it.
   * @default 288
   */
  height?: number;
  /**
   * Width of each bar in dp. When the bars do not fit the available width the chart scrolls horizontally.
   * @default 48
   */
  barWidth?: number;
  /**
   * Number of y-axis labels and gridlines, including the baseline.
   * @default 6
   */
  yTicks?: number;
  /**
   * The value at the top of the y-axis. Defaults to the largest value rounded up to a tidy number.
   */
  yMax?: number;
  /**
   * Formats the y-axis labels, e.g. to add a currency symbol.
   * @default String
   */
  formatYLabel?: (value: number) => string;
  /**
   * Formats the value shown in the tooltip.
   * @default formatYLabel
   */
  formatTooltipValue?: (value: number) => string;
  /**
   * The index of the selected bar. Use with `onSelectedChange` to control the selection.
   * Pass `null` to show no selection.
   */
  selectedIndex?: number | null;
  /**
   * The index of the bar selected on first render when the selection is uncontrolled.
   * @default the last bar
   */
  defaultSelectedIndex?: number | null;
  /**
   * Called when a bar is pressed.
   */
  onSelectedChange?: (index: number, datum: BarChartDatum) => void;
}

export default BarChartProps;
