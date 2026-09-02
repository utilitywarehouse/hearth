---
'@utilitywarehouse/hearth-react': patch
---

💅 [ENHANCEMENT]: `hearth-react` skill now defaults to the MCP server over local markdown

The skill guidance used by AI coding agents building with this package
previously defaulted to reading local markdown files for component lookups.
It now defaults to the `hearth-react` MCP server for component lookups and
general/cross-cutting guidance, falling back to markdown only for compound
components with subcomponents (e.g. `Card`) or a specific story's exact code.

**Developer changes**:

No action required — this only affects the guidance given to AI coding
agents using this library, not the runtime API.
