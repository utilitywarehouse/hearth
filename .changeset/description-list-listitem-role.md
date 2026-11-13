---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `DescriptionList` fails the `aria-required-children` accessibility rule on web

On web, a `list` element must contain only `listitem` children. `DescriptionList` broke this rule
in two ways: each `DescriptionListItem` had no `listitem` role, and the optional `heading` was
rendered inside the list.

- `DescriptionListItem` now has the `listitem` role on web. On iOS and Android it keeps the `text`
  role, so VoiceOver and TalkBack read it as before.
- The `heading` is now rendered above the list, not inside it. The spacing does not change.

**Components affected**:

- `DescriptionList`
- `DescriptionListItem`

**Developer changes**:

No action is required. Props such as `testID` and `style` stay on the outer `DescriptionList`
element. The `list` role is now on an inner element that contains only the items. Label props
(`accessibilityLabel`, `aria-label`, `accessibilityLabelledBy` and `aria-labelledby`) are passed to
that inner list, so they still name the list.
