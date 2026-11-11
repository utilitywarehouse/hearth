---
'@utilitywarehouse/hearth-json-assets': patch
---

💅 [ENHANCEMENT]: Ships a `hearth-manifest.json` listing every JSON asset with its category, type and import path

The package now includes `hearth-manifest.json`, which lists each asset's name, category
(`spot`, `logo` or `other`), type, file path and import path. Tools can read it from
`node_modules` to look up which assets exist in the installed version.
