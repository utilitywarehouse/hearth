---
'@utilitywarehouse/hearth-react': patch
---

🧹 [HOUSEKEEPING]: `Switch` now uses Base UI's Switch primitive instead of `radix-ui`

Part of the ongoing migration off `radix-ui`. `Switch` still renders a native
`<button>`. The `asChild` prop, which leaked through from the Radix prop type,
is removed. It was never meant to be public.
