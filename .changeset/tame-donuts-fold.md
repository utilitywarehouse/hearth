---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: `DetailText` `as` prop type didn't reflect that `span` is the default

Omitting `as` previously type-checked against the `div` variant instead of
`span`, the actual runtime default. `as="span"` is now optional and
`as="div"` is required, matching the rendered output.
