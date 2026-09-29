---
'@utilitywarehouse/hearth-react-native': minor
---

✨ [FEAT]: Add `Chip` and `ChipGroup` components

A compact, removable element for an active filter or attribute, and a
wrapping container to group them with an optional label. Matches the
`Chip` and `ChipGroup` API in `@utilitywarehouse/hearth-react`, with
`onPress` in place of `onClick`.

```tsx
import { Chip, ChipGroup } from '@utilitywarehouse/hearth-react-native';

<ChipGroup label="Currently showing:">
  <Chip onPress={() => removeFilter('gas')}>Gas</Chip>
  <Chip onPress={() => removeFilter('electricity')}>Electricity</Chip>
</ChipGroup>;
```

**Components affected**:

- `Chip`
- `ChipGroup`
