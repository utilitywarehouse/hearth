# React

[Storybook](https://hearth.prod.uw.systems/?path=/docs/react_getting-started--docs) (UW VPN required)

## Releases

Currently all `v0` releases should be considered unstable pre-releases. Any
breaking change will be made in a minor release, with the number of breaking
changes per minor release kept to a minimum. All breaking changes will be
documented with guidelines for how to update your code, and, if necessary,
will be accompanied by a codemod.

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

## Figma Code Connect

We use the Code Connect CLI to generate Figma components from our React
components.

You will need to make sure you have an appropriate Figma
[personal access token](https://developers.figma.com/docs/rest-api/authentication/#generate-a-personal-access-token)
set in your environment as `FIGMA_ACCESS_TOKEN`.

To generate a Figma component file, you will need to copy the link to the
component selection in the Figma file. You then need to navigate to the relevant
component directory in the package `src` and run the following command, where
`{FIGMA_LINK}` is the link you copied:

```bash
pnpm exec figma connect create {FIGMA_LINK}
```

This will generate a `{component}.figma.tsx` file in the component directory.
However we don't keep these files with the components, so you will need to move
it to the `src/figma` directory and update the import paths accordingly.

You can now update the file as best you can to connect the React component to
the one in Figma.

When you have done this, you can run the following command to publish the component to Figma:

```bash
pnpm exec figma connect publish
```
