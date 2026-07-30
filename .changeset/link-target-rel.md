---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `Link` and `InlineLink` never applied `target`/`rel` on web

On `react-native-web` builds, `@gluestack-ui/link`'s `useLink` hook sets
`target`/`rel` on the underlying DOM node imperatively via a ref mutation
during render, before the ref is attached at commit - so they never took
effect. `target="_blank"` links also never got a `rel` attribute, which is a
reverse-tabnabbing risk.

`Link` and `InlineLink` now pass `target`/`rel` through explicitly as props
(converted to `react-native-web`'s `hrefAttrs`) instead of relying on
gluestack's ref mutation. `target="_blank"` now defaults `rel` to
`noopener noreferrer` unless a `rel` prop is provided.
