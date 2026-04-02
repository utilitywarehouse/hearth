---
'@utilitywarehouse/hearth-react-native': patch
---

🌟 [FEATURE]: Add `alignChevron` to `Banner` for horizontal pressable layouts.

`Banner` now supports an `alignChevron` prop to control the chevron alignment when `onPress` is used in the horizontal layout. Use `'start'`, `'center'`, or `'end'` to match the chevron position to the content layout.

**Components affected**:
- `Banner`

**Developer changes**:

No changes are required unless you want to override the default centred chevron alignment.