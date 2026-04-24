# Avatar

User profile image with initials fallback.

```tsx
import { Avatar } from '@utilitywarehouse/hearth-react';
```

| Prop | Values |
|---|---|
| `name` | string — generates initials and accessible label |
| `src` | string — image URL |
| `size` | `'sm'` \| `'md'` — responsive, default `'md'` |

```tsx
// Initials only
<Avatar name="Rob Phoenix" />

// With image (falls back to initials if image fails to load)
<Avatar name="Rob Phoenix" src="https://example.com/avatar.jpg" />

// Responsive size
<Avatar size={{ mobile: 'sm', desktop: 'md' }} name="Rob Phoenix" />
```

**Gotcha:** Images should be square for best results. Initials are auto-generated from `name` — you can't customise them directly.
