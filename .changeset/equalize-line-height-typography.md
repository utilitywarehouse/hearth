---
'@utilitywarehouse/hearth-react': patch
---

💅 [ENHANCEMENT]: `equalizeLineHeight` prop overrides line-height to 1 on typography components

Typography line-height is normally driven by the `size` prop's token, which can
affect layout when a single line of text needs to sit tightly inside a
fixed-height container. The `equalizeLineHeight` prop overrides the
line-height to `1`, regardless of `size`.

**Components affected**:
- `BodyText`
- `DetailText`
- `Heading`
