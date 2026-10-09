---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `HighlightBanner` no longer collapses to zero height

`HighlightBanner` used `flex: 1` on its content, so inside a parent that sizes
to its content (for example a plain `View` stack) it shrank to zero height and
only the card border was visible. It now sizes to its content, and still grows
to fill a parent that gives it a fixed height.

**Components affected**:

- `HighlightBanner`

**Developer changes**:

No action is required.
