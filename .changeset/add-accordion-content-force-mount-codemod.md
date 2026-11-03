---
'@utilitywarehouse/hearth-codemod': minor
---

🌟 [FEATURE]: `AccordionContent`'s deprecated `forceMount` prop can be replaced with `keepMounted` by codemod

`react/v1/remove-accordion-content-force-mount` renames `forceMount` to
`keepMounted`. It is included in `react/pre-v1/migration`, so it can be run on
the current release before upgrading to `v1`.

```sh
npx @utilitywarehouse/hearth-codemod react/v1/remove-accordion-content-force-mount <path...>
```
