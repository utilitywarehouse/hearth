---
'@utilitywarehouse/hearth-tokens': minor
---

💔 [BREAKING CHANGE]: Some tokens have been removed

The following token changes are being released.

- Delete tabs/divider/colour variable. This is obsolete now we have border/strong
- Delete alert/focus variable. It’s not used anywhere
- Tweaked card action component because it wasn’t using the card action/content/padding-horizontal, card action/content/padding-vertical and card action/content/gap variables properly
- Altered value of checkbox/group/gap and applied it to all checkbox groups
- Applied list/item/gap variable to list item component
- Added frame to Modal Image?=True and added modal/content/gap variable
- Applied switch/padding variable to switch component
- Added card accordion variables (only 3 in total)
- Added list/indicator/padding variable
- Added pagination/item/gap variable
- Updated segmented control/group/padding variable and applied it to component

This is the first release of tokens for quite a while, so there may be some
undocumented changes.
