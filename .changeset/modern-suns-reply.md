---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: Set `pointer-events: auto` on `Combobox`

This fixes an issue when using `Combobox` with `Modal` where it would not be
possible to click on the `Combobox` options when the `Modal` is open. This is
because `Modal` sets `pointer-events: none` on all elements outside of the
`Modal` to prevent interaction with them, but this also affects the `Combobox`
options.
