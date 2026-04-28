# Email Field with Validation in hearth-react

Use the `TextInput` component. It has built-in support for labels, helper text, and validation messaging — no wrapper component needed.

## Example

```tsx
import { TextInput } from '@utilitywarehouse/hearth-react';
import { useState } from 'react';

function EmailField() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const showError = touched && email.length > 0 && !isValid;

  return (
    <form noValidate>
      <TextInput
        label="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched(true)}
        required
        validationStatus={showError ? 'invalid' : undefined}
        validationText={showError ? 'Enter a valid email address' : undefined}
        helperText="We'll use this to contact you"
      />
    </form>
  );
}
```

## Key points

- **`validationStatus="invalid"`** triggers the error styling on the input.
- **`validationText`** is the message displayed beneath the field — only render it when there is actually an error, otherwise omit the prop entirely.
- **`noValidate`** on the `<form>` suppresses the browser's own validation UI so hearth-react's styling is the only feedback shown.
- The `label` prop is handled internally by `TextInput` — do not wrap it in a `FormField` component (that is an internal implementation detail and will break accessibility).
- Validate on `onBlur` (or on submit) rather than on every keystroke so the error does not appear while the user is still typing.
- `helperText` is optional but useful for upfront guidance (e.g. format hints); it sits below the label and above the error.
