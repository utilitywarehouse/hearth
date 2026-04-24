# Tooltip

Contextual help that appears on hover or focus.

```tsx
import { Tooltip } from '@utilitywarehouse/hearth-react';
```

| Prop | Values | Notes |
|---|---|---|
| `description` | ReactNode | Required — tooltip body |
| `heading` | string | Optional heading |
| `align` | `'rightCenter'` \| `'leftCenter'` \| `'bottomLeft'` \| `'bottomCenter'` \| `'bottomRight'` \| `'topLeft'` \| `'topCenter'` \| `'topRight'` | Positioning |
| `open` | boolean | Controlled open state |

```tsx
<Tooltip description="Your email is used for account recovery and billing notifications.">
  <IconButton label="More info">
    <InfoMediumIcon />
  </IconButton>
</Tooltip>

// With heading and custom alignment
<Tooltip
  heading="Smart meter"
  description="A smart meter sends your readings automatically — no manual submissions needed."
  align="bottomCenter"
>
  <Badge colorScheme="info">Smart meter</Badge>
</Tooltip>
```

**Accessibility:** The tooltip child must be focusable (a button, link, or element with `tabIndex`). Plain `<span>` children won't trigger the tooltip on keyboard navigation.
