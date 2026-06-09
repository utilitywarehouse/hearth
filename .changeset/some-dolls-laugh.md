---
'@utilitywarehouse/hearth-react': minor
---

🌟 [FEATURE]: Add `hearth-react` agentic skill

This release includes a new agentic skill file for
`@utilitywarehouse/hearth-react`, which provides AI coding assistants with deep
knowledge of the component library. The skill covers component APIs, usage
patterns, design tokens, accessibility requirements, common mistakes, and
migration guidance. It can be easily set up with a single command or manually
added to your AI tool's config file. Upgrading the package will automatically
update the skill to keep it current.

## AI Assistant Setup

`@utilitywarehouse/hearth-react` ships with an AI skill file that gives your
coding assistant deep knowledge of the component library — including component
APIs, usage patterns, design tokens, and best practices.

## Setup

After installing the package, run the init command to wire it up for your AI tool:

```bash
npx @utilitywarehouse/hearth-react init-ai
```

This detects your AI tool's config file and adds the skill reference automatically.

### Manual setup

If you prefer to add it yourself, append the appropriate line to your project's AI config file:

| Tool                  | Config file                       | Line to add                                                                                |
| --------------------- | --------------------------------- | ------------------------------------------------------------------------------------------ |
| Claude Code           | `CLAUDE.md`                       | `@node_modules/@utilitywarehouse/hearth-react/SKILL.md`                                    |
| Cursor                | `.cursorrules`                    | `@node_modules/@utilitywarehouse/hearth-react/SKILL.md`                                    |
| Windsurf              | `.windsurfrules`                  | `@node_modules/@utilitywarehouse/hearth-react/SKILL.md`                                    |
| Codex / OpenAI agents | `AGENTS.md`                       | `See node_modules/@utilitywarehouse/hearth-react/SKILL.md for component usage guidelines.` |
| GitHub Copilot        | `.github/copilot-instructions.md` | `See node_modules/@utilitywarehouse/hearth-react/SKILL.md for component usage guidelines.` |
| Cline / Roo           | `.clinerules`                     | `@node_modules/@utilitywarehouse/hearth-react/SKILL.md`                                    |

## What the skill covers

- Component inventory and when to use each one
- Props, variants, and composition patterns
- Design token usage and theming
- Accessibility requirements and patterns
- Common mistakes and anti-patterns
- Migration guidance between versions

## Keeping it up to date

The skill file is versioned with the package — upgrading
`@utilitywarehouse/hearth-react` automatically updates the skill. No changes
needed to your config file after the initial setup.
