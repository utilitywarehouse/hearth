---
'@utilitywarehouse/hearth-react': minor
---

🌟 [FEATURE]: Add `SegmentedControl` component for switching between alternative views

A new `SegmentedControl` compound component is now available. Use it to switch
between alternative views of closely related content — distinct from `Tabs`
(navigation) and `Switch` (settings).

**Components affected**:

- `SegmentedControl`
- `SegmentedControlOption`

**Developer changes**:

```tsx
import { SegmentedControl, SegmentedControlOption } from '@utilitywarehouse/hearth-react';
import { GasSmallIcon, ElectricitySmallIcon } from '@utilitywarehouse/hearth-react-icons';

<SegmentedControl defaultValue={['gas']} size="sm">
  <SegmentedControlOption value="gas" label="Gas" icon={<GasSmallIcon />} />
  <SegmentedControlOption value="electricity" label="Electricity" icon={<ElectricitySmallIcon />} />
</SegmentedControl>
```

Two sizes are available: `sm` (32px, default) and `md` (48px). The `size` prop
accepts a responsive value for breakpoint-specific sizing.

Use the `icon` prop to display an icon before the label — either add icons to
all options or none.
