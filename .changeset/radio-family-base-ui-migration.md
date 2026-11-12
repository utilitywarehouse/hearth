---
'@utilitywarehouse/hearth-react': patch
---

🧹 [HOUSEKEEPING]: `RadioGroup`, `Radio`, `RadioCard`, and `RadioTile` now use `@base-ui/react` internally instead of `radix-ui`

**Components affected**:
- `RadioGroup`
- `Radio`
- `RadioCard`
- `RadioTile`

**Developer changes**:

No action required. These four components share a single underlying radio
group context, so they're migrated together in one change. The public prop
surface is unchanged — `onValueChange` keeps its existing signature, and
visual output and behaviour are unaffected.
