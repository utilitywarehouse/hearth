---
'@utilitywarehouse/hearth-react': minor
---

✨ [FEAT]: Add `VisuallyHidden` component and export `Slot`

`VisuallyHidden` hides content visually while keeping it available to screen readers. `Slot` is re-exported from `radix-ui`, so consumers use the same version as Hearth React.

```tsx
import { Slot, VisuallyHidden } from '@utilitywarehouse/hearth-react';

<VisuallyHidden>Opens in a new tab</VisuallyHidden>;
```

**Components affected**:

- `VisuallyHidden`
- `Slot`
