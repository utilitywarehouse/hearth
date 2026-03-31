---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: Announce `Heading` as a header for assistive technologies.

`Heading` now sets `accessibilityRole="header"` automatically so VoiceOver and TalkBack can identify headings as part of the screen structure.

**Components affected**:
- `Heading`

**Developer changes**:

No changes are required.