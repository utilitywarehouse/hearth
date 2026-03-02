---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: Improve disabled `Link` styles

The `Link` styles were being displayed when `aria-disabled` was both false &
true. This change ensures that the correct styles are applied only when
`aria-disabled='true'`.
