---
'@utilitywarehouse/hearth-react-native': patch
---

💅 [ENHANCEMENT]: `Flex` supports a `width` utility prop; `Heading`, `BodyText`, and `DetailText` support a `flexShrink` utility prop

`Flex` can now control its own width directly rather than requiring a wrapping `Box` or inline `style`. `Heading`, `BodyText`, and `DetailText` can now control how they shrink within a flex container, which is useful when other layout considerations (e.g. an icon or button alongside the text) mean the text needs to give up space to prevent overflow.

**Developer changes**:

No action required — these are additive, backward-compatible props.

```tsx
<Flex width={200}>
  <BodyText flexShrink={1}>This text can shrink to fit available space</BodyText>
</Flex>
```
