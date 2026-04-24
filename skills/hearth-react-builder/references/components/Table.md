# Table

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

**Table props:** `variant` (`'subtle'` \| `'emphasis'`), `pagination` (ReactNode)

**TableHeaderCell props:** `row` (boolean — marks a row-header cell, sets `scope="row"`)

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

**Accessibility:** Use `TableHeaderCell` (not `TableCell`) for the first cell in each data row — this creates a row header with correct scope. Column headers in `TableHeader` are automatically scoped to their column.

**Gotchas:**
- All rows render in the DOM — no virtualisation. For very large datasets, paginate server-side
- `TablePagination` is display-only — handle data fetching in `onPageChange`
- No built-in sorting or filtering
