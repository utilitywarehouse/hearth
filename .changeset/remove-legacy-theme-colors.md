---
'@utilitywarehouse/hearth-react-native': major
---

💔 [BREAKING CHANGE]: Legacy `theme.colors` palette removed from the Unistyles themes

The `light` and `dark` themes no longer include `colors`, the deprecated legacy palette (for example
`theme.colors.grey1000` or `theme.colors.purple800`). It was only there so apps still running
`@utilitywarehouse/native-ui` on Hearth's themes kept working. No Hearth component uses it. Use the
`theme.color` tokens instead.

**Developer changes**:

Replace legacy palette references with Hearth `theme.color` tokens:

```diff
 const styles = StyleSheet.create(theme => ({
   text: {
-    color: theme.colors.grey1000,
+    color: theme.color.text.primary,
   },
 }));
```

If your app still uses `@utilitywarehouse/native-ui`, its components read `theme.colors` internally. Add
the palette back from `@utilitywarehouse/colour-system` (`^0.5.0`, which has the same values) after
Hearth has configured its themes:

```ts
import '@utilitywarehouse/hearth-react-native';
import { colors, colorsCommon, colorsDark } from '@utilitywarehouse/colour-system';
import { UnistylesRuntime } from 'react-native-unistyles';

const extras = { white: '#ffffff', black: '#000000' };

UnistylesRuntime.updateTheme('light', theme => ({
  ...theme,
  colors: { ...colors, ...colorsCommon, ...extras },
}));
UnistylesRuntime.updateTheme('dark', theme => ({
  ...theme,
  colors: { ...colorsDark, ...colorsCommon, ...extras },
}));
```

Use `updateTheme` rather than a second `StyleSheet.configure`: on native, `configure` doesn't replace a
theme that's already registered.

**References**:

- [UWDS-4917](https://linear.app/utilitywarehouse/issue/UWDS-4917/remove-legacy-tokens-from-hearth-react-native-and-provide-an-auto)
