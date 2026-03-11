---
'@utilitywarehouse/hearth-react-native': patch
---

💅 [ENHANCEMENT]: Add optional leading `icon` support to `SegmentedControlOption`.

This adds an optional `icon` prop to `SegmentedControlOption`, allowing icons to be displayed before option labels in segmented controls.

Docs and stories were updated to include icon usage examples.

**Components affected**:
- `SegmentedControlOption`

**Developer changes**:

No changes required for existing usage.

To use the new optional icon prop:

```tsx
import { SegmentedControl, SegmentedControlOption } from '@utilitywarehouse/hearth-react-native';
import { ElectricityMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';

<SegmentedControl defaultValue="energy">
  <SegmentedControlOption value="energy" icon={ElectricityMediumIcon}>
    Energy
  </SegmentedControlOption>
  <SegmentedControlOption value="broadband">Broadband</SegmentedControlOption>
</SegmentedControl>
```
