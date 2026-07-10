---
'@utilitywarehouse/hearth-react-native': patch
---

💅 [ENHANCEMENT]: Standardise `size` values, selection callbacks and icon sizing tokens

All changes are backward compatible — existing props continue to work but are
now deprecated where superseded.

**`Switch` size values align with the rest of the system**

`Switch` now accepts `size="sm" | "md"`, matching every other sized component
and the web package. The previous `'small' | 'medium'` values still work but
are deprecated and will be removed in a future release.

**Selection groups gain `onValueChange`**

Selection-style group components now support `onValueChange`, aligning with
`Select`, `Combobox`, `SegmentedControl`, `Tabs` and the web package. The
existing `onChange` prop on these components is deprecated but still fires:

**Components affected**:

- `PillGroup`
- `RadioGroup`
- `CheckboxGroup`
- `RadioCardGroup`
- `ToggleButtonCardGroup`
- `Rating`

Item-level binary controls (`Checkbox`, `Radio`, `RadioCard`,
`ToggleButtonCard`) keep `onChange(isSelected)` — that convention is unchanged.

**Icon sizing now token-driven**

Hardcoded 20px/24px icon dimensions across 15 components now use the new
`theme.components.icon.sm.width|height` / `theme.components.icon.md.width|height`
tokens from `hearth-tokens`.

**`ToggleButton` announces its toggled state**

`ToggleButton` now exposes `accessibilityState.selected`, so screen readers
announce whether it is toggled.

**Developer changes**:

No changes required. To adopt the new APIs:

```diff
- <Switch value={on} onValueChange={setOn} size="small" />
+ <Switch value={on} onValueChange={setOn} size="sm" />

- <RadioGroup value={value} onChange={setValue}>
+ <RadioGroup value={value} onValueChange={setValue}>
```
