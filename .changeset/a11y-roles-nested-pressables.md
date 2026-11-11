---
'@utilitywarehouse/hearth-react-native': major
---

🐛 [FIX]: `Card` and `Alert` with `onPress`, and `CarouselControlItem`, now have the `button` role. `ToggleButtonCard` and `ToastItem` no longer nest one interactive element inside another.

- `Card` with `onPress` (or a `CardAction`) and `Alert` with `onPress` now set `accessibilityRole="button"`. Cards and alerts without a press handler are unchanged.
- The carousel page controls now set `accessibilityRole="button"` and `accessibilityState` `selected` and `disabled`. On web, the current page also sets `aria-current`.
- `ToggleButtonCard`: the outer card is no longer focusable or announced. The inner toggle button is the only control. Tests that looked for the card as a button now find only the toggle button.
- `Toast` with `onPress`: the outer `button` role is removed. With `actionText`, the action link is the control. Without it, the message is the button. The dismiss button is always separate. Tapping anywhere on the toast still runs `onPress`.
