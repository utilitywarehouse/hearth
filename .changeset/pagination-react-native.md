---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Add `Pagination` component

The package now includes a `Pagination` component for moving between pages of content. It supports numbered pagination, a condensed layout for smaller spaces, optional skip buttons for jumping to the first and last page, and controlled page state so it can be wired into lists, tables, or other paged views.

**Components affected**:
- `Pagination`

**Developer changes**:

Import `Pagination` from `@utilitywarehouse/hearth-react-native` and control the current page in your screen or feature state.

```tsx
import { useState } from 'react';
import { Pagination } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [page, setPage] = useState(1);

  return <Pagination currentPage={page} onPageChange={setPage} totalPages={10} />;
};
```