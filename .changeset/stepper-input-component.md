---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Add `StepperInput` for controlled numeric input with increment and decrement buttons.

`StepperInput` is a new React Native form component for adjusting numeric values with direct text entry and dedicated step controls. It supports min and max bounds, configurable step size, validation and helper text through `FormField`, and an opt-in `focusInputOnStepPress` prop for keyboard-first flows.

**Components affected**:
- `StepperInput`

**Developer changes**:

Import and use `StepperInput` from `@utilitywarehouse/hearth-react-native`:

```tsx
import { StepperInput } from '@utilitywarehouse/hearth-react-native';

<StepperInput
  label="Guests"
  min={1}
  max={10}
  value={value}
  onChangeText={setValue}
/>
```