---
'@utilitywarehouse/hearth-react': patch
---

💅 [ENHANCEMENT]: Add fallback fonts to `BodyText`, `DetailText`, and `Heading` components

Add system font fallbacks to the `font-family` declarations so text renders
correctly when custom fonts have not yet loaded or are unavailable.

**Components affected**:

- `BodyText`
- `DetailText`
- `Heading`

**Developer changes**:

No changes required. The fallback fonts are applied automatically.
