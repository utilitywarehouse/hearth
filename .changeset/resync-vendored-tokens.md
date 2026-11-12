---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: DM Mono text rendered at font weight 600 instead of 500

The vendored typography tokens had drifted from `@utilitywarehouse/hearth-tokens`, so DM Mono text on tablet and desktop breakpoints was heavier than designed. It now renders at weight 500. A CI check now fails when `src/tokens` differs from the token source.
