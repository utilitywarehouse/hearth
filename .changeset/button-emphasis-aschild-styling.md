---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: `Button` and `IconButton` lost all styling when `asChild` was used with the `emphasis` variant

Using `asChild` together with `variant="emphasis"` rendered the slotted
element with no classes, ARIA attributes, or event handlers at all, leaving it
completely unstyled and non-functional.

**Components affected**:
- `Button`
- `IconButton`

**Developer changes**:

No action required. `asChild` and `variant="emphasis"` can now be combined as
expected.
