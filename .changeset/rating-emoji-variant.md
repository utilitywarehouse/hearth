---
'@utilitywarehouse/hearth-react-native': patch
---

🌟 [FEATURE]: `Rating` component `emojis` variant

The `Rating` component now supports an `emojis` variant that renders emoji faces
instead of stars. When selected, the chosen emoji appears larger whilst
unselected emojis become grayscale. Two static labels ("Very dissatisfied" /
"Very satisfied") are displayed at the extremes.

**Components affected**:

- `Rating`

**Developer changes**:

```tsx
import { Rating } from '@utilitywarehouse/hearth-react-native';

<Rating value={rating} onChange={setRating} variant="emojis" />
```

All existing props (`value`, `defaultValue`, `onChange`, `disabled`, `hideLabel`)
work with the emoji variant. The `labels` prop is ignored when using
`variant="emojis"` as the emoji variant uses fixed endpoint labels.
