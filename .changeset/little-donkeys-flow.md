---
'@utilitywarehouse/hearth-react': minor
---

Rename `colorScheme` prop values. This is a breaking change.

The values for the `colorScheme` prop have been updated to reflect the
introduction of semantic design tokens. The values have been renamed as below:

- `white` -> `neutralStrong`
- `warmWhite` -> `neutralSubtle`
- `blue` -> `info`
- `green` -> `positive`
- `green` -> `affirmative`
- `red` -> `danger`
- `red` -> `destructive`
- `orange` -> `warning`
- `yellow` -> `highlight`
- `grey` -> `functional`

The changes will be dependent on the intent and usage of specific components.
The following components are included in this change:

- `Alert`
- `Badge`
- `Button`
- `IconButton`
- `Card`
- `List`

You will need to update all usages of the above components.
