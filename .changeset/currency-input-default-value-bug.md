---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: `CurrencyInput` `defaultValue` prop renders empty input

`CurrencyInput` ignored the `defaultValue` prop because the component always
set a controlled `value` on the underlying input, causing uncontrolled usage
with `defaultValue` to render an empty field instead of the provided initial
value.
