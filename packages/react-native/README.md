# React Native

## Releases

Currently all `v0` releases should be considered unstable pre-releases. Any
breaking change will be made in a minor release, with the number of breaking
changes per minor release kept to a minimum. All breaking changes will be
documented with guidelines for how to update your code, and, if necessary,
will be accompanied by a codemod.

## AI Assistant Setup

`@utilitywarehouse/hearth-react-native` ships with an AI skill file that gives
your coding assistant deep knowledge of the component library — including
component APIs, usage patterns, design tokens, and best practices.

## Setup

After installing the package, run the init command to wire it up for your AI tool:

```bash
npx @utilitywarehouse/hearth-react-native init-ai
```

This detects your AI tool's config file and adds the skill reference automatically.

### Manual setup

If you prefer to add it yourself, append the appropriate line to your project's AI config file:

| Tool                  | Config file                       | Line to add                                                                                       |
| --------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------- |
| Claude Code           | `CLAUDE.md`                       | `@node_modules/@utilitywarehouse/hearth-react-native/SKILL.md`                                    |
| Cursor                | `.cursorrules`                    | `@node_modules/@utilitywarehouse/hearth-react-native/SKILL.md`                                    |
| Windsurf              | `.windsurfrules`                  | `@node_modules/@utilitywarehouse/hearth-react-native/SKILL.md`                                    |
| Codex / OpenAI agents | `AGENTS.md`                       | `See node_modules/@utilitywarehouse/hearth-react-native/SKILL.md for component usage guidelines.` |
| GitHub Copilot        | `.github/copilot-instructions.md` | `See node_modules/@utilitywarehouse/hearth-react-native/SKILL.md for component usage guidelines.` |
| Cline / Roo           | `.clinerules`                     | `@node_modules/@utilitywarehouse/hearth-react-native/SKILL.md`                                    |

## What the skill covers

- Component inventory and when to use each one
- Utility props, variants, and composition patterns
- Design token usage and Unistyles theming
- Accessibility requirements and patterns
- Common mistakes and anti-patterns

## Keeping it up to date

The skill file is versioned with the package — upgrading
`@utilitywarehouse/hearth-react-native` automatically updates the skill. No
changes needed to your config file after the initial setup.
