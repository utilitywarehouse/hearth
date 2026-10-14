---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `CardAction` built from its parts now has the same spacing as the props API

A `CardAction` that uses `children` (`CardActionLeadingContent`, `CardActionContent`, `CardActionTrailingContent` and so on) previously rendered with no padding and no gap between its parts. It now has the same padding, gap and height as a `CardAction` built with props such as `heading` and `helperText`.

**Developer changes**:

No action is required. If you added your own padding or gap to a composed `CardAction` to work around this, you can remove it.
