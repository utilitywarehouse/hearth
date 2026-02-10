---
"@utilitywarehouse/hearth-react-native": patch
---

💅 [ENHANCEMENT]: Add `loadingHeading` prop to `Modal` component

The `Modal` component now supports a `loadingHeading` prop to customize the heading text displayed during loading states. If not provided, it defaults to 'Loading...'.

**Components affected**:
- `Modal`

**Developer changes**:

No changes required. To customize the loading heading text, use the new `loadingHeading` prop:

```tsx
<Modal
  loading={isLoading}
  loadingHeading="Processing your request..."
  heading="Confirm Action"
  description="Please wait while we process your request"
/>
```
