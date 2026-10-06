---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `List` fails the axe `aria-required-children` rule on web

On web, a list may only contain list items. The `List` heading was rendered inside the
`role="list"` element, and the items had no `listitem` role.

The `heading` (`SectionHeader`) now renders above the list instead of inside it. The `list`
role, and any `accessibilityRole` you pass to `List`, now applies to the element that wraps
the items. On web only, each `ListItem` and `ListAction` is wrapped in a `listitem` element
and keeps its own `button` role. Spacing is unchanged, and items keep the same roles on iOS
and Android.

**Components affected**:
- `List`
- `ListItem`
- `ListAction`

**Developer changes**:

No action is required. Other props you pass to `List`, such as `style`, still apply to the
outer container.
