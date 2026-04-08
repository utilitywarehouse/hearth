---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Add custom footer support to `Modal` and `NavModal`.

`Modal` and `NavModal` now support a `footer` prop for replacing the built-in primary and secondary action buttons with custom content, plus a `footerStyle` prop for styling the footer container. When `footer` is provided, the button props are now disallowed at the type level.

**Components affected**:
- `Modal`
- `NavModal`

**Developer changes**:

Use `footer` when you need a custom footer layout, such as horizontal actions or extra decoration:

```tsx
<Modal
  heading="Update billing details"
  footer={
    <Flex direction="row" spacing="md" pt="250">
      <Button variant="outline" colorScheme="functional" style={{ flex: 1 }}>
        Cancel
      </Button>
      <Button style={{ flex: 1 }}>Save changes</Button>
    </Flex>
  }
  footerStyle={{
    boxShadow: '0px -6px 12px rgba(16, 24, 40, 0.12)',
  }}
/>
```