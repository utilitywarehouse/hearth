---
'@utilitywarehouse/hearth-react-native': minor
---

✨ [FEAT]: Add `ProgressStepperText` component

A condensed "Step X of Y" summary of progress through a multi-step process,
as a compact alternative to a full `ProgressStepper`. Matches the
`ProgressStepperText` API in `@utilitywarehouse/hearth-react`.

```tsx
import { ProgressStepperText } from '@utilitywarehouse/hearth-react-native';

<ProgressStepperText currentStep={1} totalSteps={4} />;
```

**Components affected**:

- `ProgressStepperText`
