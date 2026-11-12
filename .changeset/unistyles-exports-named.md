---
'@utilitywarehouse/hearth-react-native': major
---

💔 [BREAKING CHANGE]: Hearth no longer re-exports most Unistyles APIs

Hearth used to re-export many values and types from `react-native-unistyles`. Apps did not use
most of them. Hearth now exports only `StyleSheet` from Unistyles. Import everything else from
`react-native-unistyles`. Hearth already lists it as a peer dependency, so you do not need to
install anything new.

Hearth also stops exporting two internal hooks: `usePrevious` and `useFormFieldAccessibility`.

**Developer changes**:

Import removed names from `react-native-unistyles`:

```diff
-import { StyleSheet, UnistylesRuntime } from '@utilitywarehouse/hearth-react-native';
+import { StyleSheet } from '@utilitywarehouse/hearth-react-native';
+import { UnistylesRuntime } from 'react-native-unistyles';
```

Removed from `@utilitywarehouse/hearth-react-native`:

- Values and helpers: `UnistylesRuntime`, `useUnistyles`, `withUnistyles`, `createUnistylesElement`,
  `ScopedTheme`, `Display`, `Hide`, `mq`, `getServerUnistyles`, `hydrateServerUnistyles`,
  `resetServerUnistyles`, `useServerUnistyles`
- Types: `UnistylesThemes`, `UnistylesBreakpoints`, `UnistylesVariants`
- Hooks: `usePrevious`, `useFormFieldAccessibility`

These stay: `StyleSheet`, `themes`, `lightTheme`, `darkTheme`, `breakpoints`, `AppThemes`,
`AppBreakpoints`, `useTheme`, `useColorMode`, `useBreakpointValue`, `useMedia`, `useToken` and
`useStyleProps`. The theme and breakpoint type augmentation also stays.

For every change in v1, see the
[Migrating to v1](https://hearth.prod.uw.systems/react-native/?path=/docs/guides-migrating-to-v1--docs)
guide.

**References**:

- [UWDS-5307](https://linear.app/utilitywarehouse/issue/UWDS-5307/rn-v1-stop-re-exporting-unistyles-apis-that-apps-dont-use)
