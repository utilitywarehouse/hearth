---
'@utilitywarehouse/hearth-codemod': minor
---

🔧 [ENHANCEMENT]: Add `react/v1/migrate-accordion` codemod

Migrates `Accordion` usages to the Base UI API: removes `type="single"` and
`collapsible`, replaces `type="multiple"` with `multiple`, wraps string literal
`value` / `defaultValue` in an array, and renames `AccordionContent`'s
`forceMount` to `keepMounted`. Usages it can't safely rewrite (no `type`
attribute, non-literal `type`/`value`/`defaultValue`, and every
`onValueChange`) are left unchanged and printed as warnings for manual review.

```sh
npx @utilitywarehouse/hearth-codemod react/v1/migrate-accordion <path>
```

It is also included in `react/v1/migration`. See the
[`v1` migration guide](../packages/react/docs/migration/v1.docs.mdx) for details.
