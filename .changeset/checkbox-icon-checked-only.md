---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `CheckboxIcon` only renders the tick when the `Checkbox` is checked

`CheckboxIcon` rendered the tick whatever the state, and `Checkbox` always rendered it inside the indicator, so an unchecked `Checkbox` still had a tick in the tree. It now reads the checked state from context, like `RadioIcon`. This also fixes a missing `StyleProp` import that a `@ts-expect-error` was hiding, and the web style now merges the `style` prop instead of the unrelated `props.style`.
