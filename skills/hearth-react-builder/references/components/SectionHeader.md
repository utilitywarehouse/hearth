# SectionHeader

Standardised section heading row with optional helper text and trailing content.

```tsx
import { SectionHeader } from '@utilitywarehouse/hearth-react';
```

| Prop | Values |
|---|---|
| `heading` | string |
| `headingElement` | `'h1'` \| `'h2'` \| `'h3'` \| `'h4'` \| `'div'` — default `'h2'` |
| `helperText` | string — subtitle below heading |
| `trailingContent` | ReactNode — right-aligned content |
| `direction` | `'row'` \| `'column'` — responsive, default `'row'` |
| `validationStatus` | `'invalid'` |
| `validationText` | string |

```tsx
<SectionHeader heading="Your services" headingElement="h2" />

<SectionHeader
  heading="Billing history"
  headingElement="h2"
  helperText="Last 12 months"
  trailingContent={<InlineLink href="/billing">View all</InlineLink>}
/>
```

Many components (`Accordion`, `List`, `DescriptionList`) accept `heading` / `helperText` / `headingElement` props directly — they render a `SectionHeader` internally. Use standalone `SectionHeader` only when you need the header without one of those wrapper components.
