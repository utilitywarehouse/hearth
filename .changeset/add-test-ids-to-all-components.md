---
'@utilitywarehouse/hearth-react': patch
---

🌟 [FEATURE]: Add default `data-testid` attributes to all components

All components now render with a default `data-testid` attribute using the
pattern `h-ComponentName` (e.g. `data-testid="h-Spinner"`), making it easier
to target Hearth components in automated tests without relying on class names
or other selectors.

The default value can be overridden by passing your own `data-testid` prop:

```tsx
<Spinner data-testid="my-custom-spinner" />
```

**Developer changes**:

No changes required. The test IDs are added automatically and are fully
backward-compatible.
