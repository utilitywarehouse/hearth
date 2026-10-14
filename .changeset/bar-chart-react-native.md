---
'@utilitywarehouse/hearth-react-native': minor
---

✨ [FEATURE]: Add `BarChart` component

`BarChart` compares values across categories with one bar each. Tap a bar to select it and see its
value in a tooltip. The y-axis stays in view while the bars scroll horizontally when they need more
space than is available. Selection can be controlled with `selectedIndex` and `onSelectedChange`, or
left uncontrolled with `defaultSelectedIndex`.

**Components affected**:

- `BarChart`

**Developer changes**:

No action is required. The component is built with `react-native-svg` and `react-native-reanimated`,
which are already peer dependencies.
