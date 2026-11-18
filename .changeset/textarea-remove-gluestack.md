---
'@utilitywarehouse/hearth-react-native': patch
---

🧹 [HOUSEKEEPING]: `Textarea` no longer depends on `@gluestack-ui/textarea`

`createTextarea` provided focus-state tracking, a read-only/disabled native editing lock, and `aria-invalid`/`aria-required`/`aria-disabled` wiring — all now implemented directly with React Native's built-ins. Disabled textareas are now exposed via `aria-disabled`/`accessibilityState` rather than being fully hidden from assistive tech, so they remain perceivable while still marked as disabled. `aria-invalid` is now always rendered (`true`/`false`) rather than omitted when valid, consistent with `Input`. The `required` prop is now correctly wired through to `aria-required` (previously a no-op due to a prop-name mismatch with the underlying gluestack factory).
