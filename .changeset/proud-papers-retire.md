---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: Render only valid `CardActions` children

We were rendering a `li` element for `null` children of `CardActions`, so we now
filter out any invalid children before rendering. This should prevent any
unexpected elements from being rendered in the DOM and ensure that only valid
`CardActions` children are displayed.
