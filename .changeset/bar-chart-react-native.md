---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: `BarChart` component for comparing values across categories

`BarChart` compares values across categories, one bar each. Tap a bar to see its value in a tooltip.
Bars scroll horizontally when they don't fit, y-axis stays fixed. Control selection with
`selectedIndex` and `onSelectedChange`, or leave it uncontrolled with `defaultSelectedIndex`. Give
each dataset its own `dataId`; the chart scrolls to the latest bar when it changes.

**Components affected**:

- `BarChart`

**Developer changes**:

No action is required. `BarChart` is built with `react-native-svg` and `react-native-reanimated`,
which are already peer dependencies. It also adds `d3-scale` as a runtime dependency, which is
installed automatically with the package.

Each `label` in `data` must be unique, as it is used to identify the bar.

```tsx
<BarChart
  dataId="monthly-cashback"
  data={[
    { label: 'Jun', tooltipLabel: 'June', value: 12.4 },
    { label: 'Jul', tooltipLabel: 'July', value: 14.9 },
  ]}
  formatYLabel={value => `£${value}`}
/>
```
