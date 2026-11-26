---
'@utilitywarehouse/hearth-react': patch
---

📦 [DEPS]: `CheckboxGroup` value state no longer depends on Radix UI

`CheckboxGroup` now manages its value through Base UI instead of `@radix-ui/react-use-controllable-state`. Controlled and uncontrolled usage, and `onValueChange`, behave as before.

**Developer changes**:

No action is required.
