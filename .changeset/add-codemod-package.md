---
'@utilitywarehouse/hearth-codemod': minor
---

🌟 [FEATURE]: Add `@utilitywarehouse/hearth-codemod`

A new CLI package for applying codemods that automate migrations between
major versions of Hearth packages, so breaking changes can be applied
deterministically instead of by hand.

```sh
npx @utilitywarehouse/hearth-codemod <codemod> <path...>
```

See the package [README](../packages/codemod/README.md) and the
[`v1` migration guide](../docs/migration/v1.docs.mdx) for available codemods
and usage.
