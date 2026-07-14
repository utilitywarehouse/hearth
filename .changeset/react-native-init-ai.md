---
'@utilitywarehouse/hearth-react-native': patch
---

🌟 [FEATURE]: Add `npx @utilitywarehouse/hearth-react-native init-ai` installer

Consumers can now run `npx @utilitywarehouse/hearth-react-native init-ai` to
automatically wire the package's `SKILL.md` into their project's AI assistant
config (`CLAUDE.md`, `.cursorrules`, `.windsurfrules`, `.clinerules`,
`AGENTS.md`, or `.github/copilot-instructions.md`). This mirrors the installer
already shipped with `@utilitywarehouse/hearth-react`.

**Developer changes**:

No changes required. Run `npx @utilitywarehouse/hearth-react-native init-ai`
after installing or upgrading the package to wire up the skill.
