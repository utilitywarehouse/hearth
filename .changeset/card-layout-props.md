---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: Allow Card layout props and remove forced alignment

Card now accepts flex layout and display props, and it no longer forces `alignItems: flex-start` on the root, so custom alignment works as expected.
