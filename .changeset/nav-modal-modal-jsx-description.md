---
'@utilitywarehouse/hearth-react-native': patch
---

🌟 [FEATURE]: `NavModal` and `Modal` `description` prop accepts JSX

`description` now accepts `ReactNode` in addition to a string, so you can pass
custom content such as links or styled text alongside the default text
styling.

**Components affected**:

- `NavModal`
- `Modal`

**Developer changes**:

No changes required for existing usage. To pass custom content, provide JSX
instead of a string:

```tsx
<Modal
  heading="Update available"
  description={
    <BodyText>
      Read the <InlineLink onPress={() => {}}>release notes</InlineLink> before updating.
    </BodyText>
  }
/>
```
