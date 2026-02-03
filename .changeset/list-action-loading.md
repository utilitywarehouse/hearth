---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Add `loading` prop to `ListAction` component

The `ListAction` component now supports a `loading` prop that displays a skeleton loading state while content is being fetched. This provides better user feedback during asynchronous operations.

**Components affected**:
- `ListAction`

**Developer changes**:

Use the `loading` prop to show a loading state:

```tsx
<List>
  <ListItem heading="Account details" />
  <ListAction heading="View transactions" loading={isLoading} onPress={handlePress} />
</List>
```

When `loading` is true, the action will display skeleton placeholders instead of the heading and icon.
