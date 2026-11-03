---
'@utilitywarehouse/hearth-codemod': minor
---

💅 [ENHANCEMENT]: Non-breaking codemods can be run on their own before upgrading to `v1`

`react/pre-v1/migration` runs only the non-breaking codemods, so you can apply
them on the current release and upgrade later. `react/v1/migration` runs those
plus any breaking-change codemods, and individual `react/v1/<name>` codemods
are unchanged.

```sh
npx @utilitywarehouse/hearth-codemod react/pre-v1/migration <path...>
```
