# Toast / ToastProvider

Transient notification that appears briefly and disappears.

```tsx
import { ToastProvider } from '@utilitywarehouse/hearth-react';

// Wrap your app alongside HearthProvider
<HearthProvider>
  <ToastProvider>
    {/* app content */}
  </ToastProvider>
</HearthProvider>
```

Trigger toasts using the `useToast` hook — see `apps/storybook-react/src/components/Toast.stories.tsx` for the full trigger pattern.

**Accessibility:** Toasts use `role="status"` or `role="alert"` depending on urgency — Hearth handles this automatically.
