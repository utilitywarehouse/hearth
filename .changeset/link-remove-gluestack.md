---
'@utilitywarehouse/hearth-react-native': patch
---

🧹 [HOUSEKEEPING]: `Link` and `InlineLink` no longer depend on `@gluestack-ui/link`

`createLink` only provided pressed-state tracking (for the `active` style variant), plain `role="link"`/`href`/`tabIndex`/`aria-disabled` wiring, and native URL opening via `Linking.openURL` on press — all now implemented directly with React Native's built-ins. No prop or visual change.
