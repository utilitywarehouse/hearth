---
'@utilitywarehouse/hearth-tokens': minor
---

🌟 [FEATURE]: `hearth-manifest.json` listing every colour token with its CSS variable, browser path and JS path

The package now ships a machine-readable manifest of its primitive and semantic
colour tokens. Each entry records the token's value, the alias it resolves from,
and how to reach it from each surface:

- **CSS**: the custom property, for example `--h-background-brand`.
- **Browser** (`@utilitywarehouse/hearth-tokens/browser`): the object path, for
  example `semantic.background.brand`.
- **JS** (`@utilitywarehouse/hearth-tokens`): the object path, for example
  `semanticLight.background.brand`.

Dark values are only available from the JS surface, so an entry has a `dark`
value and a JS `darkPath` only where one exists.

**Developer changes**:

No action is required. The manifest is read by tooling, and the existing CSS,
browser and JS exports are unchanged. Other token groups (space, typography,
components and so on) are not in the manifest yet.
