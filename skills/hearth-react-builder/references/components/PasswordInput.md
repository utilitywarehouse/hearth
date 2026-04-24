# PasswordInput

Same API as `TextInput` with a built-in show/hide password toggle.

```tsx
import { PasswordInput } from '@utilitywarehouse/hearth-react';

<PasswordInput
  label="Password"
  helperText="Minimum 8 characters"
  validationStatus={error ? 'invalid' : undefined}
  validationText={error?.message}
/>
```

Use `PasswordInput` instead of `TextInput type="password"` — it provides the toggle for free and is more accessible.
