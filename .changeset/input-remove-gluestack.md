---
'@utilitywarehouse/hearth-react-native': patch
---

🧹 [HOUSEKEEPING]: `Input` no longer depends on `@gluestack-ui/input`

`createInput` provided focus-state tracking (driving the focused border style), password masking (`secureTextEntry` from `type`), a read-only/disabled native editing lock, and `aria-invalid`/`aria-required`/`aria-disabled` wiring — all now implemented directly with React Native's built-ins. Disabled inputs are now exposed via `aria-disabled`/`accessibilityState` rather than being fully hidden from assistive tech (`accessibilityElementsHidden`), so they remain perceivable while still marked as disabled. No prop or visual change.
