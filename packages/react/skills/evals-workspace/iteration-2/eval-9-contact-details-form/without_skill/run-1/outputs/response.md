Here is a contact details form built with `@utilitywarehouse/hearth-react` components.

```tsx
import { Flex, TextInput, Button } from '@utilitywarehouse/hearth-react';

function ContactDetailsForm() {
  return (
    <Flex asChild direction="column" gap="400">
      <form>
        <TextInput
          label="Full name"
          type="text"
          required
        />
        <TextInput
          label="Email address"
          type="email"
          required
        />
        <TextInput
          label="Phone number"
          type="tel"
          required
        />
        <Flex gap="200">
          <Button type="submit" variant="emphasis">
            Save changes
          </Button>
          <Button type="button" variant="outline" colorScheme="functional">
            Cancel
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}
```

**Key decisions:**

- **`TextInput`** is the correct component for all three fields. It accepts a `label` prop directly (no separate `<label>` needed), a `type` prop for semantic HTML (`"text"`, `"email"`, `"tel"`), and a `required` prop.
- **Primary button** uses `variant="emphasis"` — this is the highest-emphasis button variant, appropriate for the primary action.
- **Secondary button** uses `variant="outline"` with `colorScheme="functional"` — this is the standard secondary/neutral button treatment in the design system.
- **`Flex` with `asChild`** renders the form element directly while applying layout styles (column direction, gap between fields).
- The button row uses a nested `Flex` with `gap="200"` to place the two buttons side by side.
