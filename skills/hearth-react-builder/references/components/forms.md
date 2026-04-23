# Forms & Inputs

## TextInput

The standard text input. Includes built-in label, helper text, and validation.

```tsx
import { TextInput, InputSlot } from '@utilitywarehouse/hearth-react';
```

| Prop | Values | Notes |
|---|---|---|
| `label` | string | Required for accessibility |
| `hideLabel` | boolean | Visually hides label, keeps it for screen readers |
| `placeholder` | string | |
| `helperText` | string | Informational text below input |
| `validationStatus` | `'valid'` \| `'invalid'` | |
| `validationText` | string | Error/success message shown below input |
| `type` | `'text'` \| `'email'` \| `'number'` \| `'search'` \| `'tel'` \| `'url'` | |
| `disabled` | boolean | |
| `readOnly` | boolean | |
| `required` | boolean | |
| `aria-describedby` | string | Link to additional descriptions |
| `children` | `InputSlot` | Prefix/suffix slot only |

```tsx
// Basic
<TextInput label="Email" type="email" placeholder="you@example.com" />

// With validation
<TextInput
  label="Email"
  type="email"
  validationStatus="invalid"
  validationText="Please enter a valid email address"
  required
/>

// With helper text
<TextInput
  label="Password"
  type="password"
  helperText="Must be at least 8 characters"
/>

// With prefix icon
<TextInput label="Email">
  <InputSlot placement="prefix">
    <EmailMediumIcon />
  </InputSlot>
</TextInput>

// With prefix/suffix text
<TextInput label="Price">
  <InputSlot placement="prefix">
    <BodyText size="md" weight="semibold">£</BodyText>
  </InputSlot>
</TextInput>

<TextInput label="Energy usage">
  <InputSlot placement="suffix">
    <BodyText size="md" weight="semibold">kWh</BodyText>
  </InputSlot>
</TextInput>

// React Hook Form integration
<Controller
  name="email"
  control={control}
  render={({ field, fieldState }) => (
    <TextInput
      {...field}
      label="Email"
      type="email"
      validationStatus={fieldState.error ? 'invalid' : undefined}
      validationText={fieldState.error?.message}
    />
  )}
/>

// Grouped inputs with shared description
<fieldset>
  <legend>
    <Heading as="h3" size="sm">Personal details</Heading>
  </legend>
  <BodyText id="name-hint" size="sm">As shown on your ID</BodyText>
  <Flex direction="column" gap="300">
    <TextInput label="First name" required aria-describedby="name-hint" />
    <TextInput label="Last name" required aria-describedby="name-hint" />
  </Flex>
</fieldset>
```

**Accessibility:**
- `label` is required — always provide one (use `hideLabel` if it must be visually hidden)
- `validationStatus="invalid"` automatically sets `aria-invalid` and links `validationText` via `aria-errormessage`
- `helperText` and `validationText` are automatically wired via `aria-describedby`
- Use `<fieldset>`/`<legend>` when grouping related inputs

**Gotchas:**
- Validation status/text are hidden when the input is `disabled` or `readOnly`
- `children` must be `InputSlot` — other children won't render
- Don't use `type="password"` here — use `PasswordInput` instead

---

## PasswordInput

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

---

## SearchInput

Text input with a built-in search icon and clear button.

```tsx
import { SearchInput } from '@utilitywarehouse/hearth-react';

<SearchInput label="Search" placeholder="Search accounts..." />
```

---

## TextArea

Multi-line text input. Same label/validation props as `TextInput`.

```tsx
import { TextArea } from '@utilitywarehouse/hearth-react';

<TextArea
  label="Message"
  placeholder="Tell us about your issue..."
  helperText="Maximum 500 characters"
  rows={4}
/>
```

---

## CurrencyInput

Formatted currency input. Handles £ prefix and decimal places automatically.

```tsx
import { CurrencyInput } from '@utilitywarehouse/hearth-react';

<CurrencyInput label="Monthly budget" />
```

---

## VerificationInput

OTP/PIN code input — renders individual single-digit boxes.

```tsx
import { VerificationInput } from '@utilitywarehouse/hearth-react';

<VerificationInput label="Verification code" length={6} />
```

---

## DateInput

Day/month/year split input for date entry.

```tsx
import { DateInput } from '@utilitywarehouse/hearth-react';

<DateInput label="Date of birth" />
```

---

## InputSlot

Adds prefix or suffix content inside `TextInput`.

```tsx
import { InputSlot } from '@utilitywarehouse/hearth-react';
```

| Prop | Values |
|---|---|
| `placement` | `'prefix'` \| `'suffix'` |

Must be a direct child of `TextInput`. Accepts icons, text, or other inline elements.

---

## Form layout patterns

### Vertical stack
```tsx
<Flex direction="column" gap="400">
  <TextInput label="First name" required />
  <TextInput label="Last name" required />
  <TextInput label="Email" type="email" required />
</Flex>
```

### Grouped fields (semantic fieldset)
```tsx
<fieldset>
  <legend>
    <Heading as="h2" size="md">Address</Heading>
  </legend>
  <Flex direction="column" gap="300">
    <TextInput label="Address line 1" required />
    <TextInput label="Address line 2" />
    <Flex gap="300">
      <TextInput label="Town / city" required />
      <TextInput label="Postcode" required />
    </Flex>
  </Flex>
</fieldset>
```

### Submit button
```tsx
<Button variant="emphasis" colorScheme="highlight" type="submit">
  Save changes
</Button>
```

### Error summary (top of form on failed submission)
```tsx
{hasErrors && (
  <Alert
    colorScheme="danger"
    title="There are errors in your form"
    text="Please correct the highlighted fields below."
  />
)}
```
