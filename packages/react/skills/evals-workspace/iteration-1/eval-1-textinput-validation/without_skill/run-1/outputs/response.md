# Building an Email Field with Validation in hearth-react

## The Component: `TextInput`

Use the `TextInput` component from `@utilitywarehouse/hearth-react`. It is a self-contained form field that includes the label, helper text, and validation message — all wired up with the correct ARIA attributes automatically.

## Key Props for Validation

| Prop | Type | Purpose |
|---|---|---|
| `type` | `"email"` | Sets the input to email mode (native keyboard on mobile, browser autofill hints) |
| `label` | `string` | Required. Describes the field. |
| `validationStatus` | `"valid" \| "invalid" \| undefined` | Controls the visual validation state |
| `validationText` | `string` | The message shown alongside the validation status |
| `helperText` | `string` | Optional hint shown below the label before validation occurs |
| `required` | `boolean` | Marks the field as required |

When `validationStatus` is `"invalid"`, the component automatically sets `aria-invalid` and `aria-errormessage` on the underlying `<input>` element, so screen readers announce the error correctly without any extra work on your part.

## Important: Suppress Browser Validation

Because you are handling validation yourself, add `noValidate` to the wrapping `<form>` element to stop the browser from showing its own native validation popups alongside your custom ones.

## Example 1: Controlled component with useState

The simplest approach — validate on blur (when the user leaves the field), and again on submit.

```tsx
import { useState } from 'react';
import { TextInput, Button, Flex } from '@utilitywarehouse/hearth-react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value);
}

export function EmailForm() {
  const [email, setEmail] = useState('');
  const [validationStatus, setValidationStatus] = useState<'valid' | 'invalid' | undefined>(undefined);
  const [validationText, setValidationText] = useState<string | undefined>(undefined);

  function validate(value: string) {
    if (!value) {
      setValidationStatus('invalid');
      setValidationText('Please enter your email address');
    } else if (!isValidEmail(value)) {
      setValidationStatus('invalid');
      setValidationText('Please enter a valid email address, for example name@example.com');
    } else {
      setValidationStatus('valid');
      setValidationText('Email address looks good');
    }
  }

  function handleBlur() {
    validate(email);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    validate(email);
    if (isValidEmail(email)) {
      // proceed with submission
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Flex direction="column" gap="400" alignItems="start">
        <TextInput
          type="email"
          label="Email address"
          placeholder="name@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={handleBlur}
          validationStatus={validationStatus}
          validationText={validationText}
          required
        />
        <Button type="submit">Continue</Button>
      </Flex>
    </form>
  );
}
```

## Example 2: React Hook Form (recommended for complex forms)

The Storybook for hearth-react demonstrates the React Hook Form pattern as the recommended approach for non-trivial forms. Use the `Controller` component to integrate `TextInput` cleanly.

```tsx
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button, Flex } from '@utilitywarehouse/hearth-react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormValues = {
  email: string;
};

export function EmailForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { email: '' },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Flex direction="column" gap="400" alignItems="start">
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Please enter your email address',
            pattern: {
              value: EMAIL_REGEX,
              message: 'Please enter a valid email address, for example name@example.com',
            },
          }}
          render={({ field, fieldState }) => (
            <TextInput
              {...field}  // spreads onChange, onBlur, value, and ref
              type="email"
              label="Email address"
              placeholder="name@example.com"
              validationStatus={fieldState.error ? 'invalid' : undefined}
              validationText={fieldState.error?.message}
              required
            />
          )}
        />
        <Button type="submit">Continue</Button>
      </Flex>
    </form>
  );
}
```

Spreading `{...field}` from the `Controller` `render` prop gives `TextInput` its `onChange`, `onBlur`, `value`, and `ref` — no manual wiring needed.

## How `validationStatus` and `validationText` work together

Both props must be set together. `validationStatus` drives the visual treatment (green for `"valid"`, red for `"invalid"`), while `validationText` provides the human-readable explanation. If you omit `validationText`, there is no message shown to the user and the visual change alone is not accessible enough.

Set both to `undefined` (or simply omit them) when you have not yet validated the field, such as before the user has interacted with it.

```tsx
// Before interaction — no validation shown
<TextInput label="Email address" type="email" required />

// After failed validation
<TextInput
  label="Email address"
  type="email"
  validationStatus="invalid"
  validationText="Please enter a valid email address"
  required
/>

// After passing validation
<TextInput
  label="Email address"
  type="email"
  validationStatus="valid"
  validationText="Email address looks good"
  required
/>
```

## Optional: Add an email icon

You can add a prefix icon using `InputSlot` from `@utilitywarehouse/hearth-react` and the icon from `@utilitywarehouse/hearth-react-icons`:

```tsx
import { TextInput, InputSlot } from '@utilitywarehouse/hearth-react';
import { EmailMediumIcon } from '@utilitywarehouse/hearth-react-icons';

<TextInput type="email" label="Email address" required>
  <InputSlot placement="prefix">
    <EmailMediumIcon />
  </InputSlot>
</TextInput>
```

## Summary

- Component: `TextInput` with `type="email"`
- Validation is driven by two props: `validationStatus` (`"valid"` | `"invalid"`) and `validationText` (the message string)
- Always add `noValidate` to the `<form>` to suppress browser-native validation UI
- For simple forms, use controlled state + `onBlur`/`onSubmit` handlers
- For complex forms, use React Hook Form's `Controller` component — the story examples in the library use this pattern
- ARIA wiring (`aria-invalid`, `aria-errormessage`) is handled automatically by the component when `validationStatus="invalid"`
