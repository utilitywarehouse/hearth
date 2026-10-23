---
"@utilitywarehouse/hearth-react": patch
---

💅 [ENHANCEMENT]: `keepMounted` support for `Modal`

Adds a `keepMounted` prop to `Modal`, matching the name already used by `Accordion` and `Menu`. When set, modal content remains mounted in the DOM at all times, hidden from view and the accessibility tree when closed. The existing `forceMount` prop continues to work unchanged for now and will be removed when `Modal` migrates to Base UI, so prefer `keepMounted` in new usage.

**Components affected**:

- `Modal`

**Developer changes**:

No changes required. Pass `keepMounted` to opt in:

```tsx
<Modal keepMounted heading="Heading">
  Content
</Modal>
```
