# Button

```tsx
import { Button } from '@utilitywarehouse/hearth-react';
```

| Prop | Values | Notes |
|---|---|---|
| `variant` | `'emphasis'` \| `'solid'` \| `'outline'` \| `'ghost'` | Required |
| `colorScheme` | Depends on variant (see below) | |
| `size` | `'md'` \| `'sm'` | Responsive |
| `loading` | boolean | Shows spinner, disables button, sets aria-label="Loading" |
| `disabled` | boolean | |
| `paddingNone` | boolean | Ghost variant only — removes inline padding for inline use |
| `inverted` | boolean | For use on dark backgrounds |
| `asChild` | boolean | Renders as child element (e.g. wrapping `<a>`) |

**Variant / colorScheme combinations:**

| Variant | Valid colorSchemes |
|---|---|
| `emphasis` | `'highlight'` only |
| `solid` | `'highlight'` \| `'affirmative'` \| `'destructive'` |
| `outline` | `'functional'` \| `'affirmative'` \| `'destructive'` |
| `ghost` | `'functional'` \| `'affirmative'` \| `'destructive'` |

**When to use each variant:**
- `emphasis` — hero CTAs only: landing pages, onboarding, full-width prominent calls to action. One per screen maximum.
- `solid` — primary in-page actions: form submits, confirmation buttons, "Continue" in a flow.
- `outline` — secondary actions alongside a primary: "Cancel" next to "Save", "Back" next to "Continue".
- `ghost` — tertiary or inline actions: "Add another", "Edit", actions that sit inline with content.

```tsx
// Primary in-page action (form submit)
<Button variant="solid" colorScheme="highlight" type="submit">Save changes</Button>

// Secondary alongside primary
<Flex gap="300">
  <Button variant="solid" colorScheme="highlight" type="submit">Save changes</Button>
  <Button variant="outline" colorScheme="functional" type="button" onClick={onCancel}>Cancel</Button>
</Flex>

// Hero CTA (landing/onboarding only)
<Button variant="emphasis" colorScheme="highlight">Get started</Button>

// Destructive action
<Button variant="solid" colorScheme="destructive">
  <TrashSmallIcon />
  Delete account
</Button>

// Loading state
<Button variant="solid" colorScheme="highlight" loading>Saving...</Button>

// As a navigation link (polymorphic)
<Button variant="solid" colorScheme="highlight" asChild>
  <a href="/next-step">Continue</a>
</Button>

// Ghost inline
<Button variant="ghost" colorScheme="functional" paddingNone size="sm">Add address</Button>
```

**Accessibility:**
- `loading` automatically sets `aria-label="Loading"` and disables the button
- Use `asChild` with `<a>` when navigation is the intent — not `onClick` + `window.location`
- Prefer specific button text over generic "Click here" or "Submit"

**Gotchas:**
- Not all variant/colorScheme combinations are valid — see table above
- `paddingNone` only has an effect on the ghost variant
- Use [`Link`](Link.md) for navigation, `Button` for actions — don't mix intent
