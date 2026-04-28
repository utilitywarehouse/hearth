# Email Input with Validation

Use the `TextInput` component from `@utilitywarehouse/hearth-react`.

## Component

`TextInput` has built-in support for labels, helper text, and validation — you do not need to wrap it in a `FormField` (which is internal and should never be used directly).

The relevant props for validation are:

- `validationStatus` — set to `"invalid"` to trigger the error state
- `validationText` — the error message shown below the input

## Example

```tsx
import { useState } from 'react';
import { TextInput } from '@utilitywarehouse/hearth-react';

function EmailField() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);

  const isInvalid = touched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <TextInput
      label="Email address"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onBlur={() => setTouched(true)}
      required
      validationStatus={isInvalid ? 'invalid' : undefined}
      validationText={isInvalid ? 'Enter a valid email address' : undefined}
    />
  );
}
```

## Key points

- `label` is required — it is the accessible label for the input. Do not use a separate `<label>` element.
- `validationStatus="invalid"` switches the input into its error state (red border, error icon).
- `validationText` is the message rendered below the input when in the error state.
- Add `noValidate` to the parent `<form>` element to suppress the browser's built-in validation UI, so only the hearth-react validation styling appears.
- Validate on blur (`onBlur`) rather than on every keystroke for a less disruptive UX.

## With form-level noValidate

```tsx
<form noValidate onSubmit={handleSubmit}>
  <TextInput
    label="Email address"
    type="email"
    required
    validationStatus={isInvalid ? 'invalid' : undefined}
    validationText={isInvalid ? 'Enter a valid email address' : undefined}
  />
  <Button variant="solid" colorScheme="highlight" type="submit">
    Continue
  </Button>
</form>
```
