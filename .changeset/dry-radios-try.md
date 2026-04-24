---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: Badge and Tabs now adapt their height for larger accessibility font sizes.

When larger text sizes are enabled (for example in iOS accessibility settings),
Badge and Tabs no longer clip text within fixed-height layouts. Their containers
now grow to fit scaled text while keeping the default visual sizing at standard
font settings.

**Components affected**:
- Badge
- Tab

**Developer changes**:

No code changes are required.
