---
'@utilitywarehouse/hearth-react': minor
---


Change colour props to use semantic values. The colour props will no longer use
the primitive tokens for values, and will instead use a more specific set of
semantic values.

All colour values are still available via the design tokens, which can be
accessed via CSS or JS variables in your preferred styling method.

The following props are affected by this change:

- `color`
- `backgroundColor`
- `borderColor`

The following components are affected by this change:

- `Box`
- `Flex`
- `Grid`
- `BodyText`
- `Spinner`


