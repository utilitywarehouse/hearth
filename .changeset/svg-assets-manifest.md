---
'@utilitywarehouse/hearth-svg-assets': patch
---

💅 [ENHANCEMENT]: Ships a `hearth-manifest.json` listing every SVG asset with its category and import path

The package now includes `hearth-manifest.json`, which lists each asset's name, category
(`logo`, `mascot`, `spot`, `scene`, `technical` or `other`), file path and import path.
Tools can read it from `node_modules` to look up which assets exist in the installed version.
