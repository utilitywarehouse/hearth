# Unistyles, breakpoints, providers and safe area

Source of truth: `public/llms/docs/styling.md`, `getting-started.md`.

## Unistyles styling

Custom styles use `react-native-unistyles`'s `StyleSheet.create(theme => ({...}))`
(re-exported from the package), only when utility props and component variants
don't cover the need.

- Define **variants** (`size`, `colorScheme`, `variant`, `disabled`) and apply
  with `styles.useVariants({...})`; use `compoundVariants` for combinations,
  not conditional logic in the component body.
- Read colours, spacing, radii and typography from `theme`
  (`theme.color.*`, `theme.space[...]`, `theme.borderRadius.*`, `theme.font.*`).
  Prefer tokens for pixel dimensions too, but a hardcoded value (e.g. a
  `minHeight`) is fine when the theme has no matching token: check first.
- `_web` blocks hold web-only pseudo-class styles (`_hover`, `_focus-visible`,
  `_active`); Storybook renders through `react-native-web`, so they matter there.

```tsx
const ButtonRoot = ({ variant = 'solid', size = 'md', disabled = false, ...props }) => {
  styles.useVariants({ variant, size, disabled });
  return <Pressable {...props} style={styles.container} />;
};

const styles = StyleSheet.create(theme => ({
  container: {
    borderRadius: theme.components.button.borderRadius,
    gap: theme.components.button.gap,
    _web: {
      '_focus-visible': {
        outlineStyle: 'solid',
        outlineWidth: 2,
        outlineColor: theme.color.focus.primary,
      },
    },
    variants: {
      disabled: { true: { opacity: theme.opacity.disabled } },
      variant: {
        solid: { borderColor: theme.color.interactive.highlight.border.strong },
        outline: { backgroundColor: 'transparent', borderWidth: 2 },
      },
      size: { sm: { minHeight: 32 }, md: { minHeight: 48 } },
    },
    compoundVariants: [
      { variant: 'solid', size: 'sm', styles: { paddingHorizontal: theme.space['150'] } },
    ],
  },
}));
```

## Responsive breakpoints

Breakpoints cascade mobile-first (a value applies upward until overridden).
Hearth's are `base`, `xs`, `sm`, `md`, `lg`, `xl`, `superLarge`, `tvLike`, not
the web package's `mobile`/`tablet`/`desktop`/`wide`. `base` is required and
behaves like `mobile` on web.

```tsx
const styles = StyleSheet.create(theme => ({
  container: {
    // ❌ WRONG — no style applied below `md`
    padding: { md: theme.space['400'] },
    // ✅ CORRECT
    padding: { base: theme.space['200'], md: theme.space['400'] },
  },
}));
```

`Grid`'s `columns` takes the same keys: `columns={{ base: 1, md: 2, lg: 3 }}`.
Full reference: https://www.unistyl.es/v3/references/breakpoints/

## Required app-level providers

- `GestureHandlerRootView` (`react-native-gesture-handler`): any
  gesture-driven component (`BottomSheet`, `Modal`, `Select`, swipeable `Toast`).
- `BottomSheetModalProvider` (from Hearth): any bottom-sheet-based component
  (`Modal`, `Combobox`, `Select`, `Menu`, `DatePicker`, `TimePicker`).

```tsx
import { BottomSheetModalProvider } from '@utilitywarehouse/hearth-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => (
  <GestureHandlerRootView>
    <BottomSheetModalProvider>{/* app content */}</BottomSheetModalProvider>
  </GestureHandlerRootView>
);
```

If a screen renders one of these and crashes or the sheet fails to present,
check the providers before debugging further.

## Safe area handling

- **Bottom-sheet components** (`Modal`, `Combobox`, `Select`, `BottomSheet*`)
  have no safe-area prop; they read `useSafeAreaInsets` (default `true`) from
  the nearest `BottomSheetModalProvider`. Set it `false` there only if the
  parent screen already handles insets. See `public/llms/components/modal.md`.
- **`NavModal`** (screen presented by React Navigation) reads
  `rt.insets.top`/`rt.insets.bottom` from the Unistyles runtime inside
  `StyleSheet.create((theme, rt) => ...)`. See `public/llms/components/nav-modal.md`.

Don't wrap Hearth components in your own `SafeAreaView` on top of these.
