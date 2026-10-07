---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: Animated components support reduced motion

Animated components now respect the system Reduce Motion setting, and the
`ReducedMotionConfig` override from `react-native-reanimated`. When reduced
motion is on, they skip their animation and render the final state straight
away.

**Components affected**:
- `Spinner`: shows a static arc instead of the looping animation
- `Skeleton`: no pulsing
- `VerificationInput`: the caret is solid instead of blinking
- `Expandable`, and so `Accordion` and `ExpandableCard`: no height or opacity animation
- `Toast`: no slide-in, slide-out or spring-back
- `Carousel`: no animated scroll on mount or when the active item changes, and
  `scrollToIndex` and `scrollToOffset` default to `animated: false`. An explicit
  `animated` value still wins.
- `CarouselItem`: no opacity fade between active and inactive

`BottomSheet`, `BottomSheetModal`, `Modal`, `NavModal` and `Menu` need no change:
`@gorhom/bottom-sheet` already follows the reduced motion setting.

**Developer changes**:

No action is required.
