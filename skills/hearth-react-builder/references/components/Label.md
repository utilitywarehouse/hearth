# Label

Form label or inline label text.

```tsx
import { Label } from '@utilitywarehouse/hearth-react';
```

| Prop | Values |
|---|---|
| `as` | `'label'` \| `'span'` — default `'label'` |
| `variant` | `'body'` \| `'heading'` |
| `fontWeight` | `'regular'` \| `'semibold'` |
| `disabled` | boolean — muted disabled appearance |
| `disableUserSelect` | boolean — prevents text selection |
| `htmlFor` | string — links label to input by ID |

```tsx
<Label htmlFor="email">Email address</Label>
<TextInput id="email" type="email" />
```

**Note:** Hearth form components (`TextInput`, `Select`, etc.) accept a `label` prop and render the `Label` internally. Only use standalone `Label` when building custom form layouts or labelling non-Hearth elements.
