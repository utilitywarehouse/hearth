---
'@utilitywarehouse/hearth-react-native': patch
---

🧹 [HOUSEKEEPING]: `Icon`, `CircleIcon`, and `createIcon` no longer depend on `@gluestack-ui/icon`

`createIcon` — including the standalone factory function itself, which is part of this package's public API — is now a small in-house implementation with identical behaviour: it resolves `stroke`/`color` into props (defaulting `stroke` to `currentColor`), sets `role="img"`, forwards `ref`, and renders any `path`/`d` given at creation time wrapped in a `<G>`. The dead `type="font"`/`sx` sizing branch from gluestack's implementation, which nothing in this library or its consumers ever used, has been dropped. No prop, callback, or rendered-output change.
