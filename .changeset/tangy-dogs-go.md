---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: Improve labelling of `List`

This change ensures that the `List` component is properly labelled for assistive
technologies, enhancing accessibility for users relying on screen readers.

This change also updates the documentation, removing `aria-label` props on list
items, as we are changing the guidance to not include them. This is because the
list items are already labelled by their content, and adding an `aria-label` can
create confusion for screen readers.
