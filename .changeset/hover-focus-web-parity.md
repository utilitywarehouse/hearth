---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: Missing web hover/focus-visible states on several components

On web, several components were missing hover and/or keyboard focus-visible
outlines that already exist in `@utilitywarehouse/hearth-react`, or had them
defined but disabled.

**Components affected**:
- `Accordion`
- `Card` / `CardAction`
- `DatePicker`
- `ExpandableCard`
- `List` (`ListItem`, `ListAction`)
- `RadioCard`
- `SegmentedControl`
- `Switch`
- `Tabs`
- `ToggleButton` / `ToggleButtonCard`
- `UnstyledIconButton` (and `Toast`'s close button, which reuses it)

**Developer changes**:

No action required. This is a visual-only fix for web/Storybook rendering.
