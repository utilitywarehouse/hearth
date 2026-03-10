---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Add `SegmentedControl` and `SegmentedControlOption` components.

This introduces a new segmented control component for switching between a small set of related options.
The component includes controlled and uncontrolled usage, size variants (`sm`, `md`), animated selected indicator movement, and improved accessibility semantics for screen readers.

**Components affected**:
- `SegmentedControl`
- `SegmentedControlOption`

**Developer changes**:

Import and compose the new components as follows:

```tsx
import { SegmentedControl, SegmentedControlOption } from '@utilitywarehouse/hearth-react-native';

<SegmentedControl defaultValue="day" size="sm">
  <SegmentedControlOption value="day">Day</SegmentedControlOption>
  <SegmentedControlOption value="week">Week</SegmentedControlOption>
  <SegmentedControlOption value="month">Month</SegmentedControlOption>
</SegmentedControl>
```
