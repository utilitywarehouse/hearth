---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `Roundel` success and error icons now always use the feedback foreground colour

The tick and cross icons had no colour set, so they fell back to `currentColor` and could render white or dark depending on the render. They now use `color.feedback.positive.foreground.default` and `color.feedback.danger.foreground.default`.

**Developer changes**:

No action is required.
