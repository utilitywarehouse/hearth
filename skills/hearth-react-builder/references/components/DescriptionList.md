# DescriptionList / DescriptionListItem

Key-value pairs for displaying structured information (account details, order summaries, etc.).

```tsx
import { DescriptionList, DescriptionListItem } from '@utilitywarehouse/hearth-react';
```

**DescriptionList props:**

| Prop | Values |
|---|---|
| `heading` | string |
| `headingElement` | `'div'` \| `'h1'` \| `'h2'` \| `'h3'` \| `'h4'` — default `'h2'` |
| `helperText` | string |
| `direction` | `'row'` \| `'column'` — responsive |
| `trailingContent` | ReactNode — shown at top right |
| `width` | string |
| `maxWidth` | string |

**DescriptionListItem props:**

| Prop | Values | Notes |
|---|---|---|
| `heading` | string | Required — the label/key |
| `description` | string | Required — the value |
| `link` | ReactNode | Optional action |
| `validationStatus` | `'invalid'` | |
| `validationText` | string | |

```tsx
// Column layout (label above value)
<DescriptionList heading="Order details" headingElement="h2" direction="column">
  <DescriptionListItem heading="Broadband monthly cost" description="£33.00 a month" />
  <DescriptionListItem heading="Service start date" description="25/02/2026" />
  <DescriptionListItem heading="Contract length" description="18 months" />
</DescriptionList>

// Row layout (label left, value right) — responsive
<DescriptionList
  heading="Contact details"
  direction={{ mobile: 'column', tablet: 'row' }}
  trailingContent={<InlineLink href="/account/edit">Edit</InlineLink>}
>
  <DescriptionListItem heading="Name" description="Rob Phoenix" />
  <DescriptionListItem heading="Email" description="rphoenix@example.com" />
  <DescriptionListItem heading="Phone" description="07123 456789" />
</DescriptionList>

// With validation on an item
<DescriptionListItem
  heading="Payment status"
  description="Overdue"
  validationStatus="invalid"
  validationText="Payment is 7 days overdue"
/>
```

**Gotcha:** Row direction needs enough horizontal space — use responsive direction for mobile.
