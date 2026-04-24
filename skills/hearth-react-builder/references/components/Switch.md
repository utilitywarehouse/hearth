# Switch

Toggle for binary on/off settings.

```tsx
import { Switch } from '@utilitywarehouse/hearth-react';
```

| Prop | Values | Notes |
|---|---|---|
| `size` | `'sm'` \| `'md'` | Responsive |
| `checked` | boolean | Controlled |
| `onCheckedChange` | `(checked: boolean) => void` | |
| `disabled` | boolean | |
| `label` | string | Optional visible label |
| `aria-label` | string | Required if no `label` |

```tsx
<Switch label="Enable notifications" />

// Controlled
<Switch label="Dark mode" checked={darkMode} onCheckedChange={setDarkMode} />

// External label
<Flex gap="200" alignItems="center">
  <BodyText as="label" htmlFor="airplane-mode">Airplane mode</BodyText>
  <Switch id="airplane-mode" aria-label="Airplane mode" />
</Flex>
```

**Accessibility:** Always provide either `label` or `aria-label` — a switch without a label is inaccessible.
