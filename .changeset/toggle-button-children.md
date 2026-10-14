---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: `ToggleButton` renders `children` for custom content

`ToggleButton` now renders `children` in place of the built-in tick icon and `text` label, so `ToggleButtonIcon` and `ToggleButtonText` can be composed with your own icon and label. Previously, any `children` were ignored.

**Developer changes**:

No action is required. Without `children`, `ToggleButton` renders the same as before. Pass the same `toggled` value to each part:

```tsx
<ToggleButton toggled={toggled} onToggle={setToggled}>
  <ToggleButtonIcon toggled={toggled} as={MobileSmallIcon} />
  <ToggleButtonText toggled={toggled}>Mobile</ToggleButtonText>
</ToggleButton>
```
