Here is a contact details form using `@utilitywarehouse/hearth-react` components.

```tsx
import { TextInput, Button, Flex } from '@utilitywarehouse/hearth-react';

function ContactDetailsForm() {
  return (
    <form noValidate>
      <Flex direction="column" gap="300">
        <TextInput
          label="Full name"
          id="full-name"
          required
        />
        <TextInput
          label="Email address"
          id="email-address"
          type="email"
          required
        />
        <TextInput
          label="Phone number"
          id="phone-number"
          type="tel"
          required
        />
        <Flex gap="200">
          <Button variant="solid" colorScheme="highlight" type="submit">
            Save changes
          </Button>
          <Button variant="outline" colorScheme="functional" type="button">
            Cancel
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}
```

## Key decisions

**TextInput** is the correct component for all three fields. Form inputs in hearth-react are self-managing — they accept `label`, `helperText`, `validationStatus`, and `validationText` directly as props. Do not wrap them in a `FormField` component (which is internal and must not be used).

**Button variants:**
- "Save changes" uses `variant="solid" colorScheme="highlight"` — `solid` is the correct variant for a primary action in a form. The `emphasis` variant is reserved for standalone hero CTAs (one per screen) and must not be used in forms.
- "Cancel" uses `variant="outline" colorScheme="functional"` — `outline` is the correct variant for a secondary action alongside a primary.

**Button color schemes** follow the discriminated union rule: `solid` and `emphasis` only pair with `highlight`; `outline` and `ghost` pair with `functional`, `affirmative`, or `destructive`. Using a wrong combination (e.g., `variant="solid" colorScheme="functional"`) causes a TypeScript error and renders the button colourless.

**Button alignment:** Buttons are left-aligned inside a `Flex` row, matching the form inputs above. This is the correct pattern for form actions — do not right-justify them.

**`noValidate`** is added to the `<form>` element to suppress native browser validation UI and let you control validation messaging via `validationStatus` / `validationText` on each input instead.

**`type="email"` and `type="tel"`** on the TextInput elements provide the correct mobile keyboard hints and semantic meaning without changing any hearth-react API — `TextInput` forwards all standard HTML input attributes.
