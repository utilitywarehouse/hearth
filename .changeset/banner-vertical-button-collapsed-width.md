---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `Banner` no longer collapses its `button` to zero width in the vertical direction

The vertical `Banner` wrapped its `button` in a view with `flex: 1`, inside a
row whose width is set by its content. The wrapper started at zero width, so
the button label was squeezed and wrapped (for example "Acti" and "on"). The
wrapper now sizes to its content, and still grows to fill a parent that gives
it a fixed width.

**Components affected**:

- `Banner`

**Developer changes**:

No action is required.
