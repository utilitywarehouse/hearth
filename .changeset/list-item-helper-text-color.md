---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `ListItemHelperText` ignored a consumer-supplied `color` prop

`ListItemHelperText` always rendered with a hardcoded secondary text colour,
even when a `color` prop was passed through. It now uses `BodyText`'s `color`
prop internally, so a consumer-supplied `color` is respected as documented.

**Developer changes**:

No action required. If you were not passing `color` to `ListItemHelperText`,
its appearance is unchanged.
