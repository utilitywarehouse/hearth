---
'@utilitywarehouse/hearth-react-native': patch
---

🧹 [HOUSEKEEPING]: `Tab`, `StepperButton`, `SegmentedControlOption`, `ListAction`, `CarouselControlItem`, `Pill`, `MenuItem`, `DatePickerDay`, `ExpandableCardTrigger`, `Card`, `CardAction`, and `ListItem` no longer depend on `@gluestack-ui/pressable`

`createPressable` provided press/hover/focus/focus-visible state aggregation (via `@react-native-aria/interactions`/`@react-native-aria/focus`) on top of a real `Pressable`. Only its press state was ever consumed by any of these components — hover/focus-visible were already handled entirely via `react-native-unistyles`'s `_web` pseudo-class blocks, matching the `Button` family. Where press state was only ever used to drive styling with no other component depending on its value, it's now sourced directly from `Pressable`'s own `style` callback prop with no local state at all (`Tab`, `StepperButton`, `SegmentedControlOption`, `ListAction`); where it combines with another style variant or feeds a shared context consumed by descendants (e.g. a `Button` nested in a pressed `Card`), it's tracked with a plain `onPressIn`/`onPressOut`-driven `useState`, matching the `Button`/`ToggleButton` pattern. `CarouselControlItem` never consumed the gluestack wrapper's state at all — its wrapping has simply been removed. No visual, prop, or behavioural change.
