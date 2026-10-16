---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: `BarChart` component for comparing values across categories

`BarChart` compares values across categories, one bar each. Tap a bar to see its value in a tooltip.
Bars scroll horizontally when they don't fit, y-axis stays fixed. Control selection with
`selectedIndex` and `onSelectedChange`, or leave it uncontrolled with `defaultSelectedIndex`. Give
each dataset its own `dataId`; the chart scrolls to the latest bar when it changes.

Set the bar colours with the `colorScheme` prop, following `Badge`. Unselected bars use the scheme's
subtle colour and the selected bar uses its emphasis colour. It defaults to `info`.

**Components affected**:

- `BarChart`

**Developer changes**:

No action is required. `BarChart` is built with `react-native-svg` and `react-native-reanimated`,
which are already peer dependencies. It adds no new dependencies.

```tsx
<BarChart
  dataId="monthly-cashback"
  data={[
    { label: 'Jun', tooltipLabel: 'June', value: 12.4 },
    { label: 'Jul', tooltipLabel: 'July', value: 14.9 },
  ]}
  colorScheme="cashback"
  formatYLabel={value => `£${value}`}
/>
```
