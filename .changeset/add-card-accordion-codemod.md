---
'@utilitywarehouse/hearth-codemod': minor
---

🌟 [FEATURE]: `react/v1/migrate-card-accordion` codemod available

Migrates `CardAccordion` usages to the Base UI API: wraps a string literal
`value` in an array, including through namespace imports (`<H.CardAccordion>`).
Usages it can't safely rewrite (non-literal `value`, every `onValueChange`) are
left unchanged and printed as warnings for manual review, as are prop spreads,
which may carry `value` or `onValueChange` (a literal `value` on the same element
is still migrated).

```sh
npx @utilitywarehouse/hearth-codemod react/v1/migrate-card-accordion <path>
```

It is also included in `react/v1/migration`. See the
[`v1` migration guide](../packages/react/docs/migration/v1.docs.mdx) for details.
