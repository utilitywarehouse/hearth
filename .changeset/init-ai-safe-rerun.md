---
'@utilitywarehouse/hearth-react': patch
---

🐛 [BUG]: `init-ai` crashing on a non-object `.claude/settings.json`, overwriting a project's own plugin settings and half-migrating old `CLAUDE.md` blocks in CRLF files

`npx @utilitywarehouse/hearth-react init-ai` now leaves a `.claude/settings.json` that isn't a JSON object, or whose `enabledPlugins` or `extraKnownMarketplaces` aren't objects, unchanged with a warning. Before, valid JSON such as `null` crashed it.

An existing `enabledPlugins["hearth-ai-toolkit@hearth-plugins"]` value (for example `false`) and an existing `hearth-plugins` marketplace entry are kept instead of overwritten. Old `@…/SKILL.md` blocks in `CLAUDE.md` files with CRLF line endings are replaced in full, and the new block uses the file's line endings. The closing message also tells you to install the `hearth-ai-toolkit` plugin when `CLAUDE.md` is updated.
