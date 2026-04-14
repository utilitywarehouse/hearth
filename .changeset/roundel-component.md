---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Add `Roundel` status indicator component.

`Roundel` is a compact status indicator with `success`, `pending`, and `error` variants, intended for inline state cues.

**Components affected**:
- `Roundel`

**Developer changes**:

Import and use `Roundel` from `@utilitywarehouse/hearth-react-native`:

```tsx
import { Roundel } from '@utilitywarehouse/hearth-react-native';

<Roundel variant="success" />
```