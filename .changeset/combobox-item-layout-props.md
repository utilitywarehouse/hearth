---
'@utilitywarehouse/hearth-react': patch
---

💅 [ENHANCEMENT]: `ComboboxItem` supports layout props for custom content

`ComboboxItem` now accepts `flex`, `flexBasis`, `flexShrink`, `flexGrow`,
`alignItems`, `justifyContent`, and `gap` props, making it easier to lay out
custom multi-element item content (e.g. a label alongside a trailing action)
without wrapping children in extra markup.

**Components affected**:
- `ComboboxItem`
