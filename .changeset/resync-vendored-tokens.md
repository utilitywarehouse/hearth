---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [BUG]: Resync vendored typography tokens with `@utilitywarehouse/hearth-tokens`

The vendored copy of the tokens had drifted: the DM Mono typography styles used `fontWeight: 600` instead of the source value `500`. Mono text now renders at weight 500, as designed. A CI check now fails when `src/tokens` differs from the token source.
