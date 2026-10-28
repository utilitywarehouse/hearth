---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: `CurrencyInput`'s `onChange` event loses `target.name`, `target.id` and event methods

`CurrencyInput` rebuilt the `onChange` event by spreading the real DOM element
and `SyntheticEvent`, which dropped prototype properties and methods. As a
result `event.target.name`, `event.target.id`, `event.preventDefault()` and
`event.stopPropagation()` were all unavailable, and `event.target` was no
longer `instanceof HTMLInputElement`. This broke integrations like React Hook
Form's `register()`, which reads `event.target.name` to update form state.

`onChange` now receives the real event and element (via a transparent
`Proxy`), with only `target.value`/`currentTarget.value` overridden to the
raw, comma-free numeric string, as before. No API change — this is a
backward-compatible fix.
