---
'@utilitywarehouse/hearth-react': patch
---

🧹 [HOUSEKEEPING]: `DatePicker`'s calendar popper now portals via a local `createPortal` wrapper instead of Radix's `Portal`

Part of the ongoing migration off `radix-ui`. Base UI has no standalone
exported `Portal` primitive to swap in, so this is implemented directly on
`ReactDOM.createPortal`, portaling into `document.body` as before.

No public API change — `DatePickerProps` has no `container` prop.
