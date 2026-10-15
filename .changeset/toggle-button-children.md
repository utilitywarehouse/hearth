---
'@utilitywarehouse/hearth-react-native': patch
---

💅 [ENHANCEMENT]: `ToggleButton` renders `children` and shares `toggled` with `ToggleButtonIcon` and `ToggleButtonText`

`ToggleButton` now renders `children` in place of the built-in tick icon and `text` label, so you can compose `ToggleButtonIcon` and `ToggleButtonText` with your own icon and label. Previously, any `children` were ignored. The parts read `toggled` from the parent `ToggleButton`, so you no longer need to pass it to each one.

**Developer changes**:

No action is required. Without `children`, `ToggleButton` renders the same as before. Passing `toggled` to `ToggleButtonIcon` or `ToggleButtonText` still works and overrides the value from the button.

```tsx
<ToggleButton toggled={toggled} onToggle={setToggled}>
  <ToggleButtonIcon as={MobileSmallIcon} />
  <ToggleButtonText>Mobile</ToggleButtonText>
</ToggleButton>
```
