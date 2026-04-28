# Building an Email Form Field with Validation in hearth-react

## Component to Use: `TextInput`

The `TextInput` component is the right choice. It is a self-contained form field that combines a label, an optional helper text, the input element itself, and a validation message — all wired together with the correct accessibility attributes automatically.

## How validation works

`TextInput` accepts two props that work together:

- `validationStatus`: `'valid' | 'invalid'` — controls the visual state (green tick or red error styling).
- `validationText`: `string` — the message that appears below the input when `validationStatus` is set.

Both props are ignored when the input is `disabled` or `readOnly`, so you never have to guard against that yourself.

When `validationStatus="invalid"` is set, the component automatically adds `aria-invalid` and `aria-errormessage` to the underlying `<input>`, so screen readers announce the error correctly.

## Minimal controlled example (no form library)

```tsx
import { useState } from 'react';
import { TextInput } from '@utilitywarehouse/hearth-react';

function EmailField() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const showError = touched && email.length > 0 && !isValid;

  return (
    <TextInput
      type="email"
      label="Email address"
      value={email}
      onChange={e => setEmail(e.target.value)}
      onBlur={() => setTouched(true)}
      required
      validationStatus={showError ? 'invalid' : undefined}
      validationText={showError ? 'Please enter a valid email address' : undefined}
    />
  );
}
```

Key points:
- Set `type="email"` so mobile keyboards show the `@` key.
- Only pass `validationStatus` / `validationText` when there is actually something to show; passing `undefined` hides the validation row entirely.
- Triggering validation on `onBlur` (rather than on every keystroke) gives a better user experience.

## With React Hook Form

The Storybook stories show a `ReactHookForm` pattern. Adapt it for email like this:

```tsx
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from '@utilitywarehouse/hearth-react';
import { Button } from '@utilitywarehouse/hearth-react';

type FormValues = { email: string };

function EmailForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { email: '' },
  });

  return (
    <form onSubmit={handleSubmit(data => console.log(data))} noValidate>
      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email address is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address',
          },
        }}
        render={({ field, fieldState }) => (
          <TextInput
            {...field}           // spreads onChange, onBlur, value, ref
            type="email"
            label="Email address"
            required
            validationStatus={fieldState.error ? 'invalid' : undefined}
            validationText={fieldState.error?.message}
          />
        )}
      />
      <Button type="submit">Continue</Button>
    </form>
  );
}
```

Spreading `{...field}` from `react-hook-form`'s `Controller` wires up `onChange`, `onBlur`, `value`, and `ref` in one go.

## Optional: add an email icon in the prefix slot

```tsx
import { TextInput, InputSlot } from '@utilitywarehouse/hearth-react';
import { EmailMediumIcon } from '@utilitywarehouse/hearth-react-icons';

<TextInput type="email" label="Email address" required>
  <InputSlot placement="prefix">
    <EmailMediumIcon />
  </InputSlot>
</TextInput>
```

## Summary of props used

| Prop | Type | Purpose |
|---|---|---|
| `type` | `'email'` | Correct keyboard on mobile, browser hint |
| `label` | `string` | Required — rendered as a `<label>` |
| `required` | `boolean` | Marks field as required (no "(optional)" suffix) |
| `helperText` | `string` | Optional guidance shown below the label |
| `validationStatus` | `'valid' \| 'invalid' \| undefined` | Triggers visual + ARIA error state |
| `validationText` | `string \| undefined` | The error (or success) message to display |
