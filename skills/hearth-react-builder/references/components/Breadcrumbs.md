# Breadcrumbs / BreadcrumbItem

Navigation trail showing current page location.

```tsx
import { Breadcrumbs, BreadcrumbItem } from '@utilitywarehouse/hearth-react';
```

**Breadcrumbs props:**

| Prop | Values |
|---|---|
| `inverted` | boolean — for use on darker surfaces |

**BreadcrumbItem props:** `href`, `currentPage` (boolean — marks active item)

```tsx
<Breadcrumbs>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/account">Account</BreadcrumbItem>
  <BreadcrumbItem currentPage>Contact details</BreadcrumbItem>
</Breadcrumbs>
```

**Accessibility:** The `Breadcrumbs` renders as a `<nav>` with `aria-label="breadcrumb"`. The current page item gets `aria-current="page"` automatically when `currentPage` is set.
