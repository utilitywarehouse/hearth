---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `Modal` image container children pushed to bottom, and missing gap between image and heading

`imageContainer` had `flex: 1` applied, which caused `children` to be pushed to the bottom of the container. Additionally, the gap between the `image` and the `heading` was missing.
