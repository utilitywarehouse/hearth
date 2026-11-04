---
'@utilitywarehouse/hearth-react-native': patch
---

🧹 [HOUSEKEEPING]: `Button`, `IconButton`, `UnstyledIconButton`, and `ToggleButton` no longer depend on `@gluestack-ui/button`

`createButton` provided pressed-state tracking (via `@react-native-aria/interactions`), hover/focus/focus-visible aggregation, and a `role="button"` default — all now implemented directly on React Native's `Pressable`. Pressed state is tracked with a plain `onPressIn`/`onPressOut`-driven `useState`, matching the existing `pressed` prop's OR-with-internal-state behaviour. Hover/focus/focus-visible aggregation is dropped, as none of the four components ever consumed it — they already rely on Unistyles' native `:focus-visible` pseudo-class for the focus ring. The default button role is now set via `accessibilityRole="button"` (React Native's own prop) instead of gluestack's web-oriented `role` prop, consistent with the rest of the library. `ButtonGroup`'s `reversed` prop (which reorders children) is reimplemented as a plain array reversal, since gluestack's `Group` factory was the only thing consuming it. No visual, prop, or behavioural change.
