---
'@utilitywarehouse/hearth-react-native': patch
---

💅 [ENHANCEMENT]: Faster style prop resolution in `Box` and `useStyleProps`

Utility style props (e.g. `p`, `bg`, `borderColor`) are now resolved through a
lookup table built once at load time, and theme token lookups are cached, making
the per-render cost of `Box` and every component built on `useStyleProps`
roughly 4x cheaper. `Box` also no longer passes non-serialisable props (such as
event handlers) into its Unistyles dynamic style function — only style props
cross that boundary now, in line with Unistyles' requirements for arguments
passed to C++.

**Components affected**:

- `Box`
- `Flex`
- `Grid`
- `Container`
- `Card`
- `Heading`
- `BodyText`
- `DetailText`
- `SegmentedControl`
- `RadioCard`
- `ToggleButtonCard`
- `OrderedList`
- `UnorderedList`

**Developer changes**:

No changes required. Behaviour and APIs are unchanged; the improvement is
automatic.
