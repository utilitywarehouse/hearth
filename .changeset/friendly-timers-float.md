---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: Render FormField optional text with regular weight instead of inheriting the label weight.

This fixes FormField labels that append `(Optional)` so the optional text no longer inherits the main label weight.

**Components affected**:
- `FormField`
- `Textarea`
- `Input`

**Developer changes**:

No changes are required.