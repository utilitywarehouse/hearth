---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `ListItem` alignment props are respected when composing with child components

The `leadingContentAlignment`, `contentAlignment` and `trailingContentAlignment` props now apply when `ListItem` is
used with `children`. `ListItemLeadingContent`, `ListItemContent` and `ListItemTrailingContent` also accept an
`alignment` prop, which overrides the `ListItem` prop for that part.

**Components affected**:
- `ListItem`
- `ListItemLeadingContent`
- `ListItemContent`
- `ListItemTrailingContent`

**Developer changes**:

No action is required. To override the alignment of one part:

```tsx
<ListItem onPress={onPress}>
  <ListItemLeadingContent alignment="center">...</ListItemLeadingContent>
  <ListItemContent>...</ListItemContent>
  <ListItemTrailingContent alignment="center">...</ListItemTrailingContent>
</ListItem>
```
