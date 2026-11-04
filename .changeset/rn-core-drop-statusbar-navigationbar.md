---
'@utilitywarehouse/hearth-react-native': minor
---

💔 [BREAKING CHANGE]: `StatusBar` and `NavigationBar` no longer re-exported from `core`

`react-native-unistyles` 3.3 removed `StatusBar` and `NavigationBar` from its
top-level exports, so `@utilitywarehouse/hearth-react-native`'s `core` module
(which previously re-exported everything from `react-native-unistyles`) no
longer provides them either.

**Developer changes**:

If you were importing `StatusBar` or `NavigationBar` from
`@utilitywarehouse/hearth-react-native`, they are no longer available. Import
directly from `react-native-unistyles` if you still need them, or use React
Native's own `StatusBar` API.
