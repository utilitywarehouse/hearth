---
"@utilitywarehouse/hearth-react-native": patch
---

🐛 [FIX]: Refresh dark mode tokens across components and semantic colors.

Dark mode color tokens have been updated across semantic and component tokens to improve contrast and visual consistency. This also fixes `TableHeaderCell` text colors so purple and white header variants resolve the correct foreground token.

**Components affected**:
- dark mode tokens
- `TableHeaderCell`

**Developer changes**:

No code changes are required unless you rely on the previous dark mode token values or visual snapshots.