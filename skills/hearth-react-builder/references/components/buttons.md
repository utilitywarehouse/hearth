# Buttons & Links

## Button

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

**Examples:**

```tsx
// Primary CTA
<Button variant="emphasis" colorScheme="highlight">Get started</Button>

// Secondary
<Button variant="solid" colorScheme="highlight">Continue</Button>

// Destructive action
<Button variant="solid" colorScheme="destructive">
  <TrashSmallIcon />
  Delete account
</Button>

// Loading state
<Button variant="emphasis" loading>Processing...</Button>

// Responsive size
<Button variant="solid" colorScheme="highlight" size={{ mobile: 'md', desktop: 'sm' }}>
  Submit
</Button>

// As a navigation link (polymorphic)
<Button variant="solid" colorScheme="highlight" asChild>
  <a href="/next-step">Continue</a>
</Button>

// Ghost inline — no padding, sits inline with text
<Button variant="ghost" colorScheme="functional" paddingNone size="sm">
  Add address
</Button>
```

**Accessibility:**
- `loading` automatically sets `aria-label="Loading"` and disables the button
- Use `asChild` with `<a>` when navigation is the intent — not `onClick` + `window.location`
- Prefer specific button text over generic "Click here" or "Submit"

**Gotchas:**
- Not all variant/colorScheme combinations are valid — see table above
- `paddingNone` only has an effect on the ghost variant
- Use `<Link>` for navigation, `<Button>` for actions — don't mix intent

---

## IconButton

A button containing only an icon. Requires an accessible label.

```tsx
import { IconButton } from '@utilitywarehouse/hearth-react';
import { SettingsMediumIcon } from '@utilitywarehouse/hearth-react-icons';

<IconButton label="Open settings" variant="ghost" colorScheme="functional">
  <SettingsMediumIcon />
</IconButton>
```

| Prop | Values |
|---|---|
| `label` | string — **required** accessible name |
| `variant` | Same as Button |
| `colorScheme` | Same as Button |
| `size` | `'md'` \| `'sm'` |
| `loading` | boolean |
| `inverted` | boolean |

**Accessibility:** `label` is required — it becomes the button's accessible name. The icon alone is not sufficient.

---

## UnstyledIconButton

Same API as `IconButton` but without Hearth visual styles. Use when you need a fully custom-styled icon button.

```tsx
import { UnstyledIconButton } from '@utilitywarehouse/hearth-react';
```

---

## Link

Navigation link styled as a standalone element (not inline in prose).

```tsx
import { Link } from '@utilitywarehouse/hearth-react';

<Link href="/account">View account</Link>

// With trailing icon
<Link href="/services">
  View services
  <ChevronRightSmallIcon />
</Link>

// External link
<Link href="https://uw.co.uk" target="_blank" rel="noopener noreferrer">
  Visit uw.co.uk
</Link>
```

---

## InlineLink

Navigation link for use inside body text.

```tsx
import { InlineLink } from '@utilitywarehouse/hearth-react';

<BodyText size="md">
  See our <InlineLink href="/terms">terms and conditions</InlineLink> for details.
</BodyText>
```

**Gotcha:** `InlineLink` must be inside a text component (`BodyText`, `DetailText`) for correct visual context. Don't use it standalone.

---

## Choosing between Button and Link

| Intent | Component |
|---|---|
| Navigate to a URL | `<Link>` or `<Button asChild><a>` |
| Trigger an action (submit form, open modal, delete item) | `<Button>` |
| Inline navigation within prose | `<InlineLink>` |

Never use `<Button onClick={() => window.location.href = '...'}>` for navigation. If it goes somewhere, it's a link.
