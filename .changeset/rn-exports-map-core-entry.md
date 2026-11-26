---
'@utilitywarehouse/hearth-react-native': major
---

💔 [BREAKING CHANGE]: Hearth now has an `exports` field, and adds a `/core` entry point

Hearth's `package.json` now lists its public entry points in an `exports` field. Imports from
inside the `build` folder, such as `@utilitywarehouse/hearth-react-native/build/core`, now fail
with "module not found".

There are two entry points:

- `@utilitywarehouse/hearth-react-native`: everything, as before.
- `@utilitywarehouse/hearth-react-native/core` (new): only `themes`, `lightTheme`, `darkTheme`,
  `breakpoints` and `StyleSheet`. It does not load any component, so it is much faster to import,
  for example in a Jest setup file. It does not configure Unistyles. Importing the package root does.

The package root now also exports the main props type of each component that did not have one
exported: `AccordionProps`, `AccordionItemProps`, `AlertProps`, `BadgeProps`, `BoxProps`,
`CardProps`, `CheckboxGroupProps`, `CurrencyInputProps`, `DetailTextProps`, `DividerProps`,
`FlexProps`, `FormFieldProps`, `HeadingProps`, `HelperProps`, `InputProps`, `LabelProps`,
`ListProps`, `RadioGroupProps`, `RadioCardGroupProps`, `SectionHeaderProps`, `SkeletonProps`,
`SwitchProps`, `TextareaProps`, `ToggleButtonCardGroupProps` and `ToastProviderProps`.

**Developer changes**:

Search your app for `hearth-react-native/build` and replace each import:

```diff
-import BadgeProps from '@utilitywarehouse/hearth-react-native/build/components/Badge/Badge.props';
+import type { BadgeProps } from '@utilitywarehouse/hearth-react-native';

-import { StyleSheet, themes } from '@utilitywarehouse/hearth-react-native/build/core';
+import { StyleSheet, themes } from '@utilitywarehouse/hearth-react-native/core';
```

For every change in v1, see the
[Migrating to v1](https://hearth.prod.uw.systems/react-native/?path=/docs/guides-migrating-to-v1--docs)
guide.

**References**:

- [UWDS-5314](https://linear.app/utilitywarehouse/issue/UWDS-5314/hearth-react-native-v1-add-public-core-entry-point-and-exports-map-so)
