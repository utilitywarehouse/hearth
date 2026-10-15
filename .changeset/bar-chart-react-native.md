---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: `BarChart` component for comparing values across categories

`BarChart` compares values across categories with one bar each. Tap a bar to select it and see its
value in a tooltip. The y-axis stays in view while the bars scroll horizontally when they need more
space than is available. Selection can be controlled with `selectedIndex` and `onSelectedChange`, or
left uncontrolled with `defaultSelectedIndex`. The chart scrolls to the latest bar when the required
`dataId` changes, so give each dataset a `dataId` that is unique to it.

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
