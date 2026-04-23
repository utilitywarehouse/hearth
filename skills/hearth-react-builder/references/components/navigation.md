# Navigation

## List

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
| `heading` | string |
| `headingElement` | `'div'` \| `'h1'` \| `'h2'` \| `'h3'` \| `'h4'` |
| `helperText` | string |
| `variant` | `'subtle'` \| `'emphasis'` |
| `colorScheme` | `'neutralStrong'` \| `'neutralSubtle'` |
| `trailingContent` | React node — applied to all items |
| `as` | `'ul'` \| `'ol'` |
| `paddingNone` | boolean |

**ListItemContent props:**

| Prop | Values |
|---|---|
| `heading` | string |
| `helperText` | string |
| `leadingContent` | React node — icon/avatar on left |
| `trailingContent` | React node — right-side content |
| `badge` | React node |
| `badgePlacement` | `'default'` \| `'top'` |
| `link` | React node |

**ListItemButton / ListItemLink share:** `heading`, `helperText`, `leadingContent`, `disabled`
- `ListItemButton` adds `onClick`
- `ListItemLink` adds `href`

```tsx
// Simple list
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
          <BodyText size="sm" color="brand">+£1.00 CB</BodyText>
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

---

## Tabs

Tab navigation for switching between views.

```tsx
import { Tabs, TabsList, Tab, TabContent } from '@utilitywarehouse/hearth-react';
```

| Prop | Values |
|---|---|
| `size` | `'md'` \| `'lg'` |
| `defaultValue` | string |
| `value` | string — controlled |
| `onValueChange` | `(value: string) => void` |

**Tab props:** `value` (required), `disabled`
**TabContent props:** `value` (required, must match a Tab)

```tsx
<Tabs size="md" defaultValue="account">
  <TabsList>
    <Tab value="account">Account</Tab>
    <Tab value="security">Security</Tab>
    <Tab value="billing">Billing</Tab>
    <Tab value="archived" disabled>Archived</Tab>
  </TabsList>
  <TabContent value="account">
    <BodyText size="md">Manage your personal details</BodyText>
  </TabContent>
  <TabContent value="security">
    <BodyText size="md">Update your password and 2FA settings</BodyText>
  </TabContent>
  <TabContent value="billing">
    <BodyText size="md">View invoices and payment methods</BodyText>
  </TabContent>
</Tabs>

// With icons
<TabsList>
  <Tab value="overview"><HomeSmallIcon />Overview</Tab>
  <Tab value="settings"><SettingsSmallIcon />Settings</Tab>
</TabsList>
```

**Accessibility:** Keyboard navigation (arrow keys) and `aria-selected` are handled automatically.

**Gotchas:**
- Every `TabContent` must have a matching `Tab` with the same `value`
- All tab panels render in the DOM — only the active one is visible
- For many tabs (20+), the list scrolls horizontally

---

## Menu

Dropdown context menu triggered by a button.

```tsx
import { Menu, MenuTrigger, MenuContent, MenuItem } from '@utilitywarehouse/hearth-react';
```

**Menu props:** `open`, `onOpenChange`, `defaultOpen`, `modal` (boolean, default true)

**MenuContent props:**
- `placement`: `'bottomLeft'` \| `'bottomRight'` \| `'topLeft'` \| `'topRight'`

**MenuItem props:**
- `colorScheme`: `'destructive'` \| `'functional'`
- `disabled`: boolean
- `asChild`: boolean — use child as the item (for links)
- `onClick`: function

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

**Accessibility:** Arrow key navigation, Escape to close, and proper `role="menu"` are all automatic.

**Gotcha:** Navigation items (links) must use `asChild` — don't put `href` directly on `MenuItem`.

---

## Breadcrumbs

Navigation trail showing the current page's hierarchy.

```tsx
import { Breadcrumbs, BreadcrumbItem } from '@utilitywarehouse/hearth-react';
```

**Breadcrumbs props:** `inverted` (boolean — for dark backgrounds)

**BreadcrumbItem props:** `href` (string), `currentPage` (boolean)

```tsx
<Breadcrumbs>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/services">Services</BreadcrumbItem>
  <BreadcrumbItem href="/services/energy">Energy</BreadcrumbItem>
  <BreadcrumbItem currentPage>Electricity</BreadcrumbItem>
</Breadcrumbs>

// On a dark background
<Box backgroundColor="brand" padding="400">
  <Breadcrumbs inverted>
    <BreadcrumbItem href="/">Home</BreadcrumbItem>
    <BreadcrumbItem currentPage>Current page</BreadcrumbItem>
  </Breadcrumbs>
</Box>
```

**Accessibility:** Separators are rendered automatically. The current page item has `aria-current="page"` applied.

**Gotchas:**
- Only the last item should have `currentPage` — it renders as text, not a link
- All other items need an `href`

---

## Pagination

Page navigation for paginated content.

```tsx
import { Pagination } from '@utilitywarehouse/hearth-react';
```

| Prop | Values |
|---|---|
| `currentPage` | number — 1-indexed |
| `totalPages` | number |
| `onPageChange` | `(page: number) => void` |
| `condensed` | boolean — compact layout |
| `hideSkipButtons` | boolean — hide first/last page buttons |
| `as` | `'nav'` \| `'div'` |

```tsx
const [page, setPage] = useState(1);

// Standard
<Pagination
  currentPage={page}
  totalPages={50}
  onPageChange={setPage}
/>

// Condensed (for tight layouts)
<Pagination
  currentPage={page}
  totalPages={10}
  onPageChange={setPage}
  condensed
/>
```

**Gotchas:**
- Page numbers are 1-indexed (not 0-based)
- `Pagination` is display-only — you handle data fetching when `onPageChange` fires
- For many pages, smart ellipsis renders automatically

---

## ProgressStepper

Step indicator for multi-step flows (forms, checkout, onboarding).

```tsx
import {
  ProgressStepper,
  ProgressStep,
  ProgressStepButton,
  ProgressStepLink,
} from '@utilitywarehouse/hearth-react';
```

**ProgressStepper props:** `hideLabels` (boolean)

**All step types share:** `status` (`'complete'` \| `'active'` \| `'incomplete'`), `label`, `disabled`
- `ProgressStep` — static, non-interactive
- `ProgressStepButton` — triggers `onClick`
- `ProgressStepLink` — navigates to `href`

```tsx
// Static display
<ProgressStepper>
  <ProgressStep status="complete" label="Your details" />
  <ProgressStep status="complete" label="Address" />
  <ProgressStep status="active" label="Payment" />
  <ProgressStep status="incomplete" label="Review" />
</ProgressStepper>

// Interactive (controlled by parent)
const getStatus = (step: number) => {
  if (step < currentStep) return 'complete';
  if (step === currentStep) return 'active';
  return 'incomplete';
};

<ProgressStepper>
  {steps.map((step, i) => (
    <ProgressStepButton
      key={step.id}
      status={getStatus(i)}
      label={step.label}
      onClick={() => setCurrentStep(i)}
      disabled={i > currentStep}
    />
  ))}
</ProgressStepper>

// With navigation links
<ProgressStepper>
  <ProgressStepLink status="complete" href="/details" label="Details" />
  <ProgressStepLink status="active" href="/address" label="Address" />
  <ProgressStepLink status="incomplete" href="/payment" label="Payment" disabled />
</ProgressStepper>
```

**Gotcha:** Status must be managed entirely by the parent — `ProgressStepper` has no internal state.
