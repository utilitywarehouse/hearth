---
'@utilitywarehouse/hearth-react': patch
---

💅 [ENHANCEMENT]: `init-ai` tells Claude Code to install the `hearth-ai-toolkit` plugin and invoke the `hearth-react` skill before any UI work

`npx @utilitywarehouse/hearth-react init-ai` no longer `@`-imports the package's `SKILL.md` into `CLAUDE.md`. That import made the skill look already loaded, so agents skipped invoking it, and it added the skill's full text to every session.

The block it writes now says the `hearth-react` skill and MCP server come from the `hearth-ai-toolkit` plugin, and tells agents to invoke the skill before any UI work, even in files that don't import Hearth yet. The command also adds `hearth-ai-toolkit@hearth-plugins` to `enabledPlugins` and the `hearth-plugins` marketplace to `extraKnownMarketplaces` in `.claude/settings.json`, creating the file if needed and keeping existing settings.

**Developer changes**:

Re-run `npx @utilitywarehouse/hearth-react init-ai` in apps that have the old block. It replaces the old block in place, and further runs make no changes. Install the `hearth-ai-toolkit` plugin when Claude Code prompts for it.
