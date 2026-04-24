# Alert / AlertLink / AlertIconButton

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
<Alert colorScheme="info" title="Note" text="Your rate will update on 1 January." />

// Dismissible
<Alert
  colorScheme="positive"
  title="Details saved"
  text="Your contact details have been updated successfully."
  onClose={() => setVisible(false)}
/>

// With link action
<Alert colorScheme="info" title="Action needed" text="Please review your contact details.">
  <AlertLink href="/account/details">Review now</AlertLink>
</Alert>

// With rich text body
<Alert colorScheme="danger" title="Payment failed" text="Please call us on:">
  <InlineLink href="tel:03337778777"><Strong>0333 777 8777</Strong></InlineLink>
</Alert>

// With button action
<Alert colorScheme="warning" title="Tariff expiring" text="Your tariff expires in 30 days.">
  <AlertIconButton label="Renew tariff" onClick={handleRenew} />
</Alert>
```

**AlertLink props:** `href`, `target`, `asChild`
**AlertIconButton props:** `label` (required), `onClick`

**Gotchas:**
- `text` accepts a React node for rich content — use this for embedded links
- `onClose` and `children` are separate — `onClose` renders the × button, `children` is an additional action
