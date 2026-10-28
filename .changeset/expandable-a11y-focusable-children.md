---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: Screen readers cannot reach links or buttons inside `Expandable` content

`Expandable` grouped its content into one accessibility element. VoiceOver and
TalkBack could not focus links, buttons or inputs inside it one by one.
`Expandable` no longer groups its content, so each of these controls can be
focused.

When `Expandable` is collapsed, screen readers now skip its content after the
collapse animation finishes. Before, the hidden content could still be read. On
web, collapsed content also can no longer be reached with the keyboard.

The expand and collapse animation now runs instantly when the user has turned
on reduced motion.

**Components affected**:

- `Expandable`
- `Accordion` (`AccordionContent`)
- `ExpandableCard`

**Developer changes**:

No action is required. `Expandable` no longer sets `accessibilityState={{ expanded }}`
on its content. Keep the expanded state on the control that toggles it, as
`AccordionTrigger` and `ExpandableCardTrigger` already do. On web, an
`accessibilityLabel` on `Expandable` now names the content as a region. iOS and
Android screen readers no longer announce this label.
