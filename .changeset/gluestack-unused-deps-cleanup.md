---
'@utilitywarehouse/hearth-react-native': patch
---

🧹 [HOUSEKEEPING]: Remove unused `@gluestack-ui/alert` and `@gluestack-ui/switch` dependencies

Both `Alert` and `Switch` are already hand-built with `Pressable`/reanimated/Unistyles and never used these gluestack packages. No consumer-facing change.
