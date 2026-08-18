---
'@utilitywarehouse/hearth-react-native': patch
---

🧹 [HOUSEKEEPING]: `FormField`, `Radio`, `RadioCard`, `ToggleButtonCard`, and `Checkbox` no longer depend on `@gluestack-ui/form-control`, `@gluestack-ui/radio`, or `@gluestack-ui/checkbox`

`createRadio` and `createCheckbox` provided single/multi-select group state (via `@react-native-aria`) and a hidden native `<input>` as their selection source of truth on web; both are now backed by a shared, plain-React `useSingleSelection` hook (single-select: `Radio`/`RadioCard`/`ToggleButtonCard`) or local array state (multi-select: `Checkbox`), with no hidden `<input>`. `createFormControl`'s `useFormControlProvider` id/`aria-describedby` linking was dead code (nothing downstream ever consumed the generated ids), so `FormField` drops it entirely in favour of its own existing context.

**Components affected**:
- `FormField`, `FormFieldLabel`
- `Radio`, `RadioGroup`
- `RadioCard`, `RadioCardGroup`
- `ToggleButtonCard`, `ToggleButtonCardGroup`, `ToggleButton`
- `Checkbox`, `CheckboxGroup`

Several consumer-visible fixes came out of this migration:
- `FormFieldLabel` previously rendered `null` regardless of its children, due to a gluestack factory misconfiguration — it now renders its children correctly (see the `FormField` "Advanced Usage" docs and the `Switch` "Switch with Label" example, both of which were silently broken).
- `Radio`, `RadioCard`, and `Checkbox` now expose their checked state to assistive tech and browser-based tests on web via `aria-checked`, in addition to React Native's own `accessibilityState`, matching the pattern already used by `Switch` and `Accordion`.
- A disabled `ToggleButtonCard` now consistently disables its inner toggle button too, rather than only dimming the outer card background.
- `Radio` and `RadioCard` no longer render their selected-state dot at all unless actually checked — previously the dot was always visible (in a fixed colour), so an entire group of radios could look selected at once even though only one (or none) genuinely was.
- Fixed a web-only bug where a disabled `Radio`, `RadioCard`, `Checkbox`, `ToggleButtonCard`, or `ToggleButton` still showed its hover/pressed styling on mouseover, because React Native Web's `Pressable` only blocks pointer events on the element itself when disabled (`pointer-events: box-none`), not on its descendants — the `:hover`/`:active` CSS rules on the inner indicator now only exist when the component is enabled.

No prop, callback, or rendered-output change beyond the fixes above. No developer changes required.
