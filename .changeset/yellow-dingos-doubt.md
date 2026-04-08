---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Add flex utility props to `Container`.

`Container` now exposes shared flex layout utility props, allowing layout properties such as `flex`, `alignItems`, `justifyContent`, and `flexDirection` to be applied directly through its public prop API.

**Component affected**:
- `Container`

**Developer changes**:

You can now combine `Container`'s existing spacing props with flex layout props:

```tsx
<Container flex={1} justifyContent="center" alignItems="stretch" gap="200">
  <BodyText>Content</BodyText>
</Container>
```