---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Add `ProgressBar` component with linear and circular variants.

**Developer changes**:

Use `ProgressBar` with a default percentage label, or override the label to show a custom value:

```tsx
import { ProgressBar } from '@utilitywarehouse/hearth-react-native';

<ProgressBar value={42} label="Uploading documents" />

<ProgressBar
    value={68}
    max={100}
    label="Data allowance"
    variant="circular"
    formatValueText={(value, { max }) => `${max - value}GB remaining`}
/>
```
