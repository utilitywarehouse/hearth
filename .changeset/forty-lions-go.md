---
'@utilitywarehouse/hearth-react': patch
---

Add `asChild` to `ListItemLink` component.

You can use the `ListItemLink` component with Next.js's `Link` component by using the
`asChild` prop. This allows you to wrap the `ListItemLink` around Next.js's `Link`
component, enabling client-side navigation while maintaining the styling and
functionality of the `ListItemLink`.

```tsx
import NextLink from 'next/link';
import { List, ListItem, ListItemLink } from '@utilitywarehouse/hearth-react';

[...]

<List>
  <ListItem>
    <ListItemLink heading="Page One" asChild>
      <NextLink href="/one" />
    </ListItemLink>
  </ListItem>
  <ListItem>
    <ListItemLink heading="Page Two" asChild>
      <NextLink href="/two" />
    </ListItemLink>
  </ListItem>
</List>
```
