---
'@utilitywarehouse/hearth-react-native': patch
---

💅 [ENHANCEMENT]: Add `invalidText` prop to `ExpandableCardGroup`

The `ExpandableCardGroup` component now supports an `invalidText` prop that displays validation text below the helper text when the group is in an invalid state.

**Components affected**:
- `ExpandableCardGroup`

**Developer changes**:

No changes required. If you want to display validation text, you can now use the `invalidText` prop:

```tsx
<ExpandableCardGroup
  heading="Select an option"
  helperText="Choose one of the options below"
  invalidText="Please select at least one option"
>
  {/* ExpandableCard components */}
</ExpandableCardGroup>
```
