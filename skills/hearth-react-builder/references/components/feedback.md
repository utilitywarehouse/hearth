# Feedback

## Alert

Contextual messages for info, success, warnings, and errors.

```tsx
import { Alert, AlertLink, AlertIconButton } from '@utilitywarehouse/hearth-react';
```

| Prop | Values | Notes |
|---|---|---|
| `colorScheme` | `'info'` \| `'positive'` \| `'danger'` \| `'warning'` | Required |
| `title` | string | Required |
| `text` | string or React node | Body content |
| `onClose` | `() => void` | Makes the alert dismissible |
| `children` | `AlertLink` or `AlertIconButton` | Optional action |

```tsx
// Basic
<Alert colorScheme="info" title="Note" text="Your rate will update on 1 January." />

// Dismissible
<Alert
  colorScheme="positive"
  title="Success"
  text="Your details have been saved."
  onClose={() => setVisible(false)}
/>

// With link
<Alert colorScheme="info" title="Action needed" text="Please review your contact details.">
  <AlertLink href="/account/details">Review now</AlertLink>
</Alert>

// With rich text (React node as text)
<Alert colorScheme="danger" title="Payment failed" text="Please call us on:">
  <InlineLink href="tel:03337778777"><Strong>0333 777 8777</Strong></InlineLink>
</Alert>

// With custom button action
<Alert colorScheme="warning" title="Tariff expiring" text="Your tariff expires in 30 days.">
  <AlertIconButton label="Renew tariff" onClick={handleRenew} />
</Alert>

// Multiple alerts in a grid
<Grid defaultResponsiveColumns gap="200">
  <Alert colorScheme="info" title="Info" text="..." gridColumnSpan="4" />
  <Alert colorScheme="positive" title="Success" text="..." gridColumnSpan="4" />
</Grid>
```

**AlertLink props:** `href`, `target`, `asChild`, optional children (icon-only if no children)
**AlertIconButton props:** `label` (required), `onClick`

**Gotchas:**
- `text` accepts a React node for rich content; use this for embedded links
- `AlertLink` without children renders as an icon-only link — `label` is required in this case
- `onClose` and `children` are separate — `onClose` is the × button, `children` is an additional action

---

## Toast

Transient notification that appears briefly and disappears. Requires `ToastProvider` at the app root.

```tsx
import { ToastProvider } from '@utilitywarehouse/hearth-react';

// Wrap your app (alongside HearthProvider)
<HearthProvider>
  <ToastProvider>
    {/* app content */}
  </ToastProvider>
</HearthProvider>
```

Trigger toasts using the `useToast` hook (or equivalent API — see `apps/storybook-react/src/components/Toast.stories.tsx` for the full trigger pattern).

**Accessibility:** Toasts use `role="status"` or `role="alert"` depending on urgency — Hearth handles this automatically.

---

## Badge

Small label for status, counts, or category tags.

```tsx
import { Badge } from '@utilitywarehouse/hearth-react';
```

| Prop | Values |
|---|---|
| `colorScheme` | `'info'` \| `'positive'` \| `'warning'` \| `'danger'` \| `'neutral'` |

```tsx
<Badge colorScheme="info">Smart meter</Badge>
<Badge colorScheme="positive">Active</Badge>
<Badge colorScheme="warning">Review needed</Badge>
<Badge colorScheme="danger">Overdue</Badge>
<Badge colorScheme="neutral">Pending</Badge>
```

Commonly used inside `CardActionLink`'s `badge` prop:
```tsx
<CardActionLink
  heading="Electricity"
  badge={<Badge colorScheme="info">Smart meter</Badge>}
  badgePlacement="middle"
  href="/electricity"
/>
```

---

## Spinner

Loading indicator for async operations.

```tsx
import { Spinner } from '@utilitywarehouse/hearth-react';

// Inline (e.g. inside a button — prefer Button's loading prop instead)
<Spinner />

// Full-area loading state
<Center minHeight="200px">
  <Spinner />
</Center>
```

**Accessibility:** Wrap in a live region or add `aria-label` if the spinner replaces meaningful content.

**Gotcha:** For button loading states, use the `Button loading` prop — it handles the spinner and accessible state automatically. Don't render a `Spinner` inside a `Button` manually.

---

## Divider

Horizontal rule for visual separation between sections.

```tsx
import { Divider } from '@utilitywarehouse/hearth-react';

<Divider />
```

---

## ProgressBar

Visual indicator of completion progress.

```tsx
import { ProgressBar } from '@utilitywarehouse/hearth-react';

<ProgressBar value={65} max={100} label="Upload progress" />
```

**Accessibility:** Always provide `label` — it becomes the `aria-label` for the underlying `<progress>` element.

---

## HighlightBanner

Full-width promotional or informational banner with optional footer actions.

```tsx
import { HighlightBanner, HighlightBannerContent, HighlightBannerFooter } from '@utilitywarehouse/hearth-react';
```

See `apps/storybook-react/src/components/HighlightBanner.stories.tsx` for full usage examples and available props.
