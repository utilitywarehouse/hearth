---
'@utilitywarehouse/hearth-react-native': minor
---

🐛 [FIX]: `ListItem` content is now vertically centred by default

`ListItem` content, numeric value and trailing content are now vertically
centred, matching the design system. `ListItemLeadingContent` is aligned to the
top by default (`alignSelf: 'flex-start'`), so leading icons stay next to the
heading when the helper text wraps.

🌟 [FEATURE]: `ListItem` parts can be customised with `leadingContentProps`, `contentProps` and `trailingContentProps`

These props forward `View` props (such as `style`) to each part, so you can
override the default alignment without composing the parts yourself.

```tsx
<ListItem
  heading="Payments"
  leadingContent={<ListItemIcon as={PaymentMediumIcon} />}
  leadingContentProps={{ style: { alignSelf: 'center' } }}
/>
```

**Components affected**:

- `ListItem`
- `ListItemLeadingContent`
