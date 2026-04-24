# Tabs / Tab / TabsList / TabContent

Tab navigation with keyboard support.

```tsx
import { Tabs, Tab, TabsList, TabContent } from '@utilitywarehouse/hearth-react';
```

**Tabs props:**

| Prop | Values |
|---|---|
| `defaultValue` | string — initially selected tab |
| `value` | string — controlled |
| `onValueChange` | `(value: string) => void` |
| `size` | `'md'` \| `'lg'` — responsive |
| `activationMode` | `'automatic'` \| `'manual'` — default `'automatic'` |

**Tab (trigger) props:** `value` (required), `disabled`

**TabContent props:** `value` (required, must match a Tab)

```tsx
<Tabs defaultValue="account">
  <TabsList>
    <Tab value="account">Account</Tab>
    <Tab value="security">Security</Tab>
    <Tab value="billing">Billing</Tab>
    <Tab value="archived" disabled>Archived</Tab>
  </TabsList>
  <TabContent value="account">
    <BodyText>Manage your personal details</BodyText>
  </TabContent>
  <TabContent value="security">
    <BodyText>Update your password and 2FA settings</BodyText>
  </TabContent>
  <TabContent value="billing">
    <BodyText>View invoices and payment methods</BodyText>
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
- Use `activationMode="manual"` if tab switching triggers network requests — this prevents requests firing on every arrow key press
