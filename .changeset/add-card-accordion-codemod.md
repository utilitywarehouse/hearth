---
'@utilitywarehouse/hearth-codemod': minor
---

🌟 [FEATURE]: `react/v1/migrate-card-accordion` codemod available

Migrates `CardAccordion` usages to the Base UI API: wraps a string literal
`value` in an array. Usages it can't safely rewrite (non-literal `value`, every
`onValueChange`, prop spreads) are left unchanged and printed as warnings for
manual review.

```sh
npx @utilitywarehouse/hearth-codemod react/v1/migrate-card-accordion <path>
```

It is also included in `react/v1/migration`. See the
[`v1` migration guide](../packages/react/docs/migration/v1.docs.mdx) for details.
