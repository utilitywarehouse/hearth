# Link / InlineLink

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

// External
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
| Trigger an action (submit form, open modal, delete item) | [`<Button>`](Button.md) |
| Inline navigation within prose | `<InlineLink>` |

Never use `<Button onClick={() => window.location.href = '...'}>` for navigation. If it goes somewhere, it's a link.
