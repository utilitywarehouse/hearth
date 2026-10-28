---
'@utilitywarehouse/hearth-react-native': patch
---

💅 [ENHANCEMENT]: `Card` and `ListItem` accept more layout props

`Card` now accepts:

- size props: `width`, `height`, `minWidth`, `minHeight`, `maxWidth`, `maxHeight`, `w` and `h`
- padding props, such as `padding`
- border radius props, such as `borderRadius`
- `direction`, an alias for `flexDirection` that matches `Flex`

`ListItem` now accepts `alignItems`, which sets the vertical alignment of all its parts.
`leadingContentAlignment`, `contentAlignment` and `trailingContentAlignment` still take precedence.

**Components affected**:

- `Card`
- `ListItem`

**Developer changes**:

No changes are needed. Code such as `<Card width="full" direction="column">` or
`<ListItem alignItems="center" heading="…" />` now type-checks and is applied.
