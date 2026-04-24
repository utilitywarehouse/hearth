# List / ListItem / ListItemContent / ListItemButton / ListItemLink / ListActionLink / ListActionButton

Structured list with optional heading, icons, and interactive items.

```tsx
import {
  List,
  ListItem,
  ListItemContent,
  ListItemButton,
  ListItemLink,
  ListActionButton,
  ListActionLink,
} from '@utilitywarehouse/hearth-react';
```

**List props:**

| Prop | Values |
|---|---|
| `as` | `'ul'` \| `'ol'` — default `'ul'` |
| `heading` | string |
| `headingElement` | `'div'` \| `'h1'` \| `'h2'` \| `'h3'` \| `'h4'` |
| `helperText` | string |
| `variant` | `'subtle'` \| `'emphasis'` |
| `colorScheme` | `'neutralStrong'` \| `'neutralSubtle'` |
| `trailingContent` | ReactNode — applied to every item |
| `paddingNone` | boolean |

**ListItemContent props:**

| Prop | Values |
|---|---|
| `heading` | string |
| `helperText` | string |
| `leadingContent` | ReactNode — icon or avatar on the left |
| `trailingContent` | ReactNode — right-side content (overrides List-level `trailingContent`) |
| `badge` | ReactNode |
| `badgePlacement` | `'default'` \| `'top'` |
| `link` | ReactNode |

**ListItemButton / ListItemLink:** accept `heading`, `helperText`, `leadingContent`, `disabled`; Link adds `href`, Button adds `onClick`.

**ListActionLink / ListActionButton:** full-width call-to-action row at the end of the list; accept `heading`.

```tsx
// Simple navigation list
<List heading="Settings" as="ul">
  <ListItem>
    <ListItemLink heading="Account details" href="/account" />
  </ListItem>
  <ListItem>
    <ListItemLink heading="Notifications" href="/notifications" />
  </ListItem>
</List>

// With icons and helper text
<List heading="Your services" headingElement="h2" variant="emphasis">
  <ListItem>
    <ListItemContent
      heading="Energy"
      helperText="Gas & Electricity"
      leadingContent={<IconContainer colorScheme="energy"><ElectricityMediumIcon /></IconContainer>}
    />
  </ListItem>
  <ListItem>
    <ListItemButton
      heading="Delete account"
      helperText="This cannot be undone"
      leadingContent={<TrashMediumIcon />}
      onClick={handleDelete}
    />
  </ListItem>
</List>

// Transaction list with custom trailing content
<List as="ul">
  <ListItem>
    <ListItemContent
      heading="Boots"
      helperText="5:30pm today"
      leadingContent={<Avatar name="B" size="sm" />}
      trailingContent={
        <Flex direction="column" alignItems="end">
          <BodyText size="md">-£100.00</BodyText>
          <BodyText size="sm">+£1.00 CB</BodyText>
        </Flex>
      }
    />
  </ListItem>
</List>

// With call-to-action at the end
<List heading="Recent activity">
  {items.map(item => (
    <ListItem key={item.id}>
      <ListItemContent heading={item.title} helperText={item.date} />
    </ListItem>
  ))}
  <ListActionLink href="/activity" heading="View all activity" />
</List>
```

**Gotcha:** `trailingContent` on `List` applies to every item. Per-item `trailingContent` on `ListItemContent` overrides it.
