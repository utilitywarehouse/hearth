# Data Display

## Avatar

User or entity avatar showing an image or auto-generated initials.

```tsx
import { Avatar } from '@utilitywarehouse/hearth-react';
```

| Prop | Values | Notes |
|---|---|---|
| `name` | string | Generates initials; used as accessible label |
| `src` | string | Image URL |
| `size` | `'sm'` \| `'md'` | Responsive |

```tsx
// Initials only
<Avatar size="md" name="Rob Phoenix" />

// With image (falls back to initials if image fails to load)
<Avatar size="md" src="https://example.com/avatar.jpg" name="Rob Phoenix" />

// Responsive size
<Avatar size={{ mobile: 'sm', desktop: 'md' }} name="Rob Phoenix" />
```

**Gotcha:** Images should be square for best results. Initials are auto-generated from the name — you can't customise them directly.

---

## Table

Structured data in rows and columns.

```tsx
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from '@utilitywarehouse/hearth-react';
```

**Table props:** `variant` (`'subtle'` \| `'emphasis'`), `pagination` (React node)

**TableHeaderCell props:**
- `row` — boolean, marks a header cell in a data row (row scope)

**TablePagination props:** `currentPage`, `totalPages`, `onPageChange`

```tsx
// Basic table
<Table variant="emphasis">
  <TableHeader>
    <TableHeaderCell>Name</TableHeaderCell>
    <TableHeaderCell>Email</TableHeaderCell>
    <TableHeaderCell>Status</TableHeaderCell>
  </TableHeader>
  <TableBody>
    {users.map(user => (
      <TableRow key={user.id}>
        <TableHeaderCell row>{user.name}</TableHeaderCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>
          <Badge colorScheme={user.active ? 'positive' : 'neutral'}>
            {user.active ? 'Active' : 'Inactive'}
          </Badge>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

// With pagination
<Table
  variant="emphasis"
  pagination={
    <TablePagination
      currentPage={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  }
>
  <TableHeader>
    <TableHeaderCell>Date</TableHeaderCell>
    <TableHeaderCell>Amount</TableHeaderCell>
    <TableHeaderCell>Description</TableHeaderCell>
  </TableHeader>
  <TableBody>
    {transactions.map(tx => (
      <TableRow key={tx.id}>
        <TableHeaderCell row>{tx.date}</TableHeaderCell>
        <TableCell>{tx.amount}</TableCell>
        <TableCell>{tx.description}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

**Accessibility:**
- Use `TableHeaderCell` (not `TableCell`) for the first cell in each data row — this creates a row header with correct scope
- Column headers in `TableHeader` are automatically scoped to their column

**Gotchas:**
- All rows render in the DOM — no virtualisation. For very large datasets, paginate server-side
- `TablePagination` is display-only — handle data fetching in `onPageChange`
- No built-in sorting or filtering

---

## DescriptionList

Key-value pairs for displaying structured information (account details, order summaries, etc.).

```tsx
import { DescriptionList, DescriptionListItem } from '@utilitywarehouse/hearth-react';
```

**DescriptionList props:**

| Prop | Values |
|---|---|
| `heading` | string |
| `headingElement` | `'div'` \| `'h1'` \| `'h2'` \| `'h3'` \| `'h4'` |
| `helperText` | string |
| `direction` | `'row'` \| `'column'` or responsive |
| `trailingContent` | React node — shown at top right |
| `width` | string |
| `maxWidth` | string |

**DescriptionListItem props:**

| Prop | Values |
|---|---|
| `heading` | string — the label/key |
| `description` | string — the value |
| `link` | React node |
| `validationStatus` | `'invalid'` |
| `validationText` | string |

```tsx
// Column layout (label above value)
<DescriptionList heading="Order details" headingElement="h2" direction="column">
  <DescriptionListItem heading="Broadband monthly cost" description="£33.00 a month" />
  <DescriptionListItem heading="Service start date" description="25/02/2026" />
  <DescriptionListItem heading="Contract length" description="18 months" />
</DescriptionList>

// Row layout (label left, value right)
<DescriptionList
  heading="Contact details"
  direction={{ mobile: 'column', tablet: 'row' }}
  trailingContent={<Link href="/account/edit">Edit</Link>}
>
  <DescriptionListItem heading="Name" description="Rob Phoenix" />
  <DescriptionListItem heading="Email" description="rphoenix@uw.co.uk" />
  <DescriptionListItem heading="Phone" description="07123 456789" />
</DescriptionList>

// With validation
<DescriptionListItem
  heading="Payment status"
  description="Overdue"
  validationStatus="invalid"
  validationText="Payment is 7 days overdue"
/>
```

**Gotcha:** Row direction needs enough horizontal space — use responsive direction for mobile.

---

## ProgressBar

Visual indicator of completion percentage.

```tsx
import { ProgressBar } from '@utilitywarehouse/hearth-react';

<ProgressBar value={65} max={100} label="Account completion" />

// Inside a card
<Flex direction="column" gap="200">
  <Flex justifyContent="between">
    <BodyText size="sm">Account complete</BodyText>
    <BodyText size="sm" weight="semibold">65%</BodyText>
  </Flex>
  <ProgressBar value={65} max={100} label="Account completion progress" />
</Flex>
```

**Accessibility:** `label` becomes the `aria-label` on the underlying `<progress>` element — always provide it.
