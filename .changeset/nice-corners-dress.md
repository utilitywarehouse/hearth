---
'@utilitywarehouse/hearth-react-native': minor
---

🐛 [FIX]: `UnorderedList` and `OrderedList` layout when inside a centred flex container

Both list components now render correctly when their parent uses
`alignItems="center"`. Previously, the list would collapse to the width of the
bullet/number, leaving text invisible or clipped beside each list item.

**Before**: wrapping `UL` or `OL` in a `Box` with `alignItems="center"` caused
bullets and numbers to appear without any adjacent text.

**After**: both components always stretch to fill their parent's width via
`alignSelf: 'stretch'`, regardless of the parent's `alignItems` setting.
