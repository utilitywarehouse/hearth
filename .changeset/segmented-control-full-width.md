---
'@utilitywarehouse/hearth-react-native': patch
---

🌟 [FEATURE]: `SegmentedControl` supports a `fullWidth` prop

Set `fullWidth` to make the control fill the width of its container. Options share the width equally.

```tsx
<SegmentedControl fullWidth>
  <SegmentedControlOption value="day">Day</SegmentedControlOption>
  <SegmentedControlOption value="week">Week</SegmentedControlOption>
</SegmentedControl>
```

The selected indicator now also stays aligned when the control is resized.

**Components affected**:

- `SegmentedControl`
- `SegmentedControlOption`

**Developer changes**:

No action required. `fullWidth` defaults to `false`.
