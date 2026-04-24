# IconButton / UnstyledIconButton

## IconButton

A button containing only an icon. Requires an accessible label.

```tsx
import { IconButton } from '@utilitywarehouse/hearth-react';
import { SettingsMediumIcon } from '@utilitywarehouse/hearth-react-icons';

<IconButton label="Open settings" variant="ghost" colorScheme="functional">
  <SettingsMediumIcon />
</IconButton>
```

| Prop | Values |
|---|---|
| `label` | string — **required** accessible name |
| `variant` | Same as Button |
| `colorScheme` | Same as Button |
| `size` | `'md'` \| `'sm'` |
| `loading` | boolean |
| `inverted` | boolean |

**Accessibility:** `label` is required — it becomes the button's accessible name. The icon alone is not sufficient.

---

## UnstyledIconButton

Same API as `IconButton` but without Hearth visual styles. Use when you need a fully custom-styled icon button.

```tsx
import { UnstyledIconButton } from '@utilitywarehouse/hearth-react';

<UnstyledIconButton label="Close">
  <CloseSmallIcon />
</UnstyledIconButton>
```
