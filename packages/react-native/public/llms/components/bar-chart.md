# Bar Chart

A bar chart compares values across categories, one bar each. Tap a bar to see its value in a tooltip.
Bars scroll horizontally when they don't fit, and the y-axis stays in place.

The chart fills the width of its parent, so place it in a container with a definite width. Give each
dataset its own `dataId`, for example `2025`.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Selecting a bar](#selecting-a-bar)
- [Controlled selection](#controlled-selection)
- [Scrolling](#scrolling)
- [Automatic y-axis](#automatic-y-axis)
- [Accessibility](#accessibility)

## Playground

```tsx
// Example usage
<BarChart
  data={monthlyCashback}
  dataId="monthly-cashback"
  height={240}
  barWidth={48}
  yTicks={6}
  yMax={24}
  formatYLabel={formatCurrency}
/>
```

## Usage

```tsx
// Example usage
import { BarChart } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <BarChart
    dataId="monthly-cashback"
    yMax={24}
    formatYLabel={value => `£${value}`}
    data={[
      { label: 'Jun 25', tooltipLabel: 'June', value: 12.4 },
      { label: 'Jul 25', tooltipLabel: 'July', value: 14.9 },
      { label: 'Aug 25', tooltipLabel: 'August', value: 21.8 },
      { label: 'Sep 25', tooltipLabel: 'September', value: 8.2 },
    ]}
  />
);
```

## Props

| Property               | Type                                            | Description                                                                                           | Default        |
| ---------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------- | -------------- |
| `data`                 | `BarChartDatum[]`                               | The data points to plot, one bar each.                                                                |                |
| `dataId`               | `string`                                        | Identifies the dataset and must be unique to it. The chart scrolls to the latest bar when it changes. |                |
| `height`               | `number`                                        | Height of the plot area in dp. The x-axis labels and tooltip sit outside it.                          | `288`          |
| `barWidth`             | `number`                                        | Width of each bar in dp. The chart scrolls when the bars do not fit.                                  | `48`           |
| `yTicks`               | `number`                                        | Number of y-axis labels and gridlines, including the baseline.                                        | `6`            |
| `yMax`                 | `number`                                        | The value at the top of the y-axis. Defaults to the largest value rounded up.                         |                |
| `formatYLabel`         | `(value: number) => string`                     | Formats the y-axis labels, for example to add a currency symbol.                                      | `String`       |
| `formatTooltipValue`   | `(value: number) => string`                     | Formats the value shown in the tooltip.                                                               | `formatYLabel` |
| `selectedIndex`        | `number \| null`                                | The selected bar. Use with `onSelectedChange` to control it. `null` shows no selection.               |                |
| `defaultSelectedIndex` | `number \| null`                                | The bar selected on first render when the selection is uncontrolled.                                  | The last bar   |
| `onSelectedChange`     | `(index: number, datum: BarChartDatum) => void` | Called when a bar is pressed.                                                                         |                |

### BarChartDatum

| Property       | Type     | Description                                                 | Default |
| -------------- | -------- | ----------------------------------------------------------- | ------- |
| `label`        | `string` | Short label shown beneath the bar, for example `Sep 25`.    |         |
| `value`        | `number` | The value the bar represents.                               |         |
| `tooltipLabel` | `string` | Longer label shown in the tooltip, for example `September`. | `label` |

## Selecting a bar

The last bar is selected by default. Pressing a bar selects it, fills it with the brand surface colour, and
shows its `tooltipLabel` and formatted value in the tooltip. Set `defaultSelectedIndex` to start on a different
bar, or to `null` to start with nothing selected.

```tsx
// Example usage
<BarChart
  data={monthlyCashback}
  dataId="monthly-cashback"
  height={240}
  barWidth={48}
  yTicks={6}
  yMax={24}
  formatYLabel={formatCurrency}
  onSelectedChange={fn()}
/>
```

## Controlled selection

Pass `selectedIndex` together with `onSelectedChange` to own the selection. Pass `null` to clear it.

```tsx
// Example usage
<ControlledExample {...args} />
```

```tsx
// Example usage
const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

<BarChart
  data={data}
  dataId="monthly-cashback"
  selectedIndex={selectedIndex}
  onSelectedChange={setSelectedIndex}
/>;
```

## Scrolling

Each bar needs `barWidth` plus a small gap. When the bars need more width than is available, the plot scrolls
horizontally and starts scrolled to the latest bar. The y-axis labels stay in place.

```tsx
// Example usage
<BarChart
  data={manyMonths}
  dataId="many-months"
  height={240}
  barWidth={48}
  yTicks={6}
  yMax={24}
  formatYLabel={formatCurrency}
/>
```

### Changing the data

The chart scrolls back to the latest bar whenever `dataId` changes, for example when switching between two
years. Updating the values while keeping the same `dataId` leaves the scroll position alone, so change the
`dataId` whenever you swap in a different dataset.

```tsx
// Example usage
<DataChangeSameLengthExample {...args} />
```

```tsx
// Example usage
<BarChart data={dataByYear[year]} dataId={String(year)} />
```

## Automatic y-axis

Without `yMax` the top of the y-axis is the largest value rounded up to a tidy number.

```tsx
// Example usage
<BarChart data={monthlyCashback} dataId="monthly-cashback" height={240} barWidth={48} yTicks={6} />
```

## Accessibility

Each bar is a radio in a radio group. Its accessible name is the tooltip label and formatted value, for
example "August, £21.80", and it reports whether it is checked. The axes, gridlines and bar shapes are hidden
from assistive technology, so the radios carry the data. The tooltip is announced when the selection changes.
The chart skips its animations when the device's Reduce Motion setting is on.
