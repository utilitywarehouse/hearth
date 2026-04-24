# Menu / MenuTrigger / MenuContent / MenuItem

Dropdown context menu triggered by a button.

```tsx
import { Menu, MenuTrigger, MenuContent, MenuItem } from '@utilitywarehouse/hearth-react';
```

**Menu props:** `open`, `onOpenChange`, `defaultOpen`, `modal` (boolean, default `true`)

**MenuContent props:**

| Prop | Values |
|---|---|
| `placement` | `'bottomLeft'` \| `'bottomRight'` \| `'topLeft'` \| `'topRight'` |

**MenuItem props:**

| Prop | Values |
|---|---|
| `colorScheme` | `'functional'` \| `'destructive'` |
| `disabled` | boolean |
| `asChild` | boolean — use child as item (for links) |
| `onClick` | function |

```tsx
// Button trigger
<Menu>
  <MenuTrigger>
    <Button variant="outline" colorScheme="functional">Options</Button>
  </MenuTrigger>
  <MenuContent placement="bottomLeft">
    <MenuItem onClick={handleEdit}>Edit</MenuItem>
    <MenuItem asChild>
      <a href="/settings">Settings <OpenSmallIcon /></a>
    </MenuItem>
    <MenuItem colorScheme="destructive" onClick={handleDelete}>Delete</MenuItem>
    <MenuItem disabled>Archived</MenuItem>
  </MenuContent>
</Menu>

// IconButton trigger
<Menu>
  <MenuTrigger>
    <IconButton label="More options" variant="ghost" colorScheme="functional">
      <MoreMediumIcon />
    </IconButton>
  </MenuTrigger>
  <MenuContent placement="bottomRight">
    <MenuItem>View details</MenuItem>
    <MenuItem colorScheme="destructive">Remove</MenuItem>
  </MenuContent>
</Menu>
```

**Accessibility:** Arrow key navigation, Escape to close, and `role="menu"` are all automatic.

**Gotcha:** Navigation items (links) must use `asChild` — don't put `href` directly on `MenuItem`.
