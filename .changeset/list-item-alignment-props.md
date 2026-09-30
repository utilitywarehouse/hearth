---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: `ListItem` parts can be aligned with `leadingContentAlignment`, `contentAlignment` and `trailingContentAlignment`

Each prop accepts an `alignSelf` value (`'flex-start'`, `'center'`, `'flex-end'`)
and sets the vertical alignment of that part. The defaults match the design
system: leading content aligns to the top, content is centred, and trailing
content aligns to the top. Trailing icons (the default chevron shown when
`onPress` is set, or a `ListItemTrailingIcon` passed as `trailingContent`) stay
centred.

**Visual change:** trailing content other than an icon (for example a `Link`,
`Button` or `Switch`) now aligns to the top by default instead of being centred.
Set `trailingContentAlignment="center"` to keep the previous behaviour, for
example for transaction amounts.

```tsx
<ListItem
  heading="Coffee Shop"
  helperText="Apr 5, 2024"
  trailingContent={<BodyText>-£100.00</BodyText>}
  trailingContentAlignment="center"
/>
```

The Figma Code Connect mapping now covers every `ListItem` trailing content
variant (Icon, Link, Button, Switch and Transaction) with its matching alignment.

**Components affected**:

- `ListItem`
