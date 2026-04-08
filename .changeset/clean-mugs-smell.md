---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Add margin, padding, and layout utility props to `Flex`.

`Flex` now exposes the shared margin and padding utility props, along with the existing layout utility prop surface, so it can be used more like other layout primitives such as `Card`.

**Component affected**:
- `Flex`

**Developer changes**:

You can now apply spacing and layout utility props directly on `Flex`:

```tsx
<Flex direction="row" spacing="md" padding="300" marginTop="200" flex={1}>
  <Button>Back</Button>
  <Button>Continue</Button>
</Flex>
```
