---
'@utilitywarehouse/hearth-react': minor
---

🌟 [FEATURE]: `Timeline` and `TimelineItem` components for showing a sequence of events or steps

`Timeline` renders an ordered list of `TimelineItem`s, each with a `label`,
optional `helperText`, and a `state` (`complete`, `active`, or
`incomplete`) shown via an indicator and connector line. Use the `static`
variant for a purely informational history or schedule, and the `progress`
variant when the sequence represents the user's advancement through it. Set
`danglingRail` on `Timeline` to extend the final item's connector beyond
the list and fade it to transparent, for a final `incomplete` item that
suggests the timeline continues.

**Components affected**:
- `Timeline`
- `TimelineItem`
