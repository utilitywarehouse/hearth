---
'@utilitywarehouse/hearth-react': patch
---

🧹 [HOUSEKEEPING]: `Select` and `SelectItem` use Base UI instead of Radix

`Select` and `SelectItem` are now built on `@base-ui/react/select` instead of Radix's `Select`, and the options list scrollbar is now built on Base UI's `ScrollArea`, matching `Combobox`. The `SelectProps` and `SelectItemProps` public API is unchanged.

**Components affected**:

- `Select`
- `SelectItem`

**Developer changes**:

No changes required.
