# Pagination

Page navigation for paginated content.

```tsx
import { Pagination } from '@utilitywarehouse/hearth-react';
```

| Prop | Values | Notes |
|---|---|---|
| `currentPage` | number | Required — 1-indexed |
| `totalPages` | number | Required |
| `onPageChange` | `(page: number) => void` | Required |
| `as` | `'div'` \| `'nav'` | Default `'div'` |
| `condensed` | boolean | Shows "Page X of Y" only |
| `hideSkipButtons` | boolean | Hides first/last page buttons |

```tsx
const [page, setPage] = useState(1);

<Pagination
  currentPage={page}
  totalPages={20}
  onPageChange={setPage}
  as="nav"
/>

// Compact variant for tight spaces
<Pagination
  currentPage={page}
  totalPages={20}
  onPageChange={setPage}
  condensed
/>
```
