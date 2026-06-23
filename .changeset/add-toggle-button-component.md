---
'@utilitywarehouse/hearth-react': patch
---

🌟 [FEATURE]: Add `ToggleButton` component

A new standalone `ToggleButton` component is now available for use with
`ToggleGroup`. Unlike `ToggleButtonCard`, `ToggleButton` is just the button
itself — it has no card wrapper — making it suitable for layouts where the
toggle controls need to live inside a custom container, such as a tariff
comparison table.

`ToggleButtonCard` has been updated to use `ToggleButton` internally, so its
visual appearance and behaviour are unchanged.

**Developer changes**:

```tsx
import { ToggleButton, ToggleGroup } from '@utilitywarehouse/hearth-react';

<ToggleGroup type="single" gap="200">
  <ToggleButton value="fixed">Select plan</ToggleButton>
  <ToggleButton value="variable">Select plan</ToggleButton>
</ToggleGroup>
```

No changes are required if you are already using `ToggleButtonCard`.
