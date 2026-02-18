---
'@utilitywarehouse/hearth-react': patch
---

🌟 [FEATURE]: Add props to `Modal` to control the ability to dismiss

**Components affected**:
  - `Modal`

This change adds the `onPointerDownOutside`, `onEscapeKeyDown` & `onInteractOutside`
props to `Modal` to allow users to prevent the modal from closing when users
click outside of the modal or press the escape key.

These props are inherited from the underlying `Dialog.Content` component from
[Radix UI](https://www.radix-ui.com/primitives/docs/components/dialog#content).
