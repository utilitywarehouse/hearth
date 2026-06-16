# AI Tools

The Hearth React AI Tools are intended to help your AI agents use Hearth React
components to build Utility Warehouse UIs. They provide access to APIs,
component documentation and usage guidelines, so your agent has the context it
needs to build with Hearth correctly.

These tools include:

- [llms.txt](https://hearth.prod.uw.systems/react/llms.txt) and markdown docs
- [SKILL.md](https://github.com/utilitywarehouse/hearth/blob/main/packages/react/SKILL.md)
- [MCP Server](https://main--68dbda8270df9c2a6568ece8.chromatic.com/mcp)

## llms.txt and markdown docs

The [llms.txt](https://hearth.prod.uw.systems/react/llms.txt) file is a list of
all Hearth React documentation, and each documentation page has a corresponding
markdown, file for use by AI agents.

This documentation is also included in the Hearth React package, so your agent
can access it locally if you have the package installed. The easiest way to do
this is via the Hearth React Agent Skill.

## Agent Skill

The [Hearth React Agent Skill](https://github.com/utilitywarehouse/hearth/blob/main/packages/react/SKILL.md)
is a skill for your AI agent to use when building any React UI.

The skill is packaged with the Hearth React package, so your agent can access it locally if you have the package installed.
To ensure your agent has access to the skill, you can add an entry to your local `AGENTS.md` or `CLAUDE.md` file.

You can do this by using the `init-ai` tool:

```console
npx @utilitywarehouse/hearth-react init-ai
```

This will add an entry to your `AGENTS.md` or `CLAUDE.md` file pointing to the local skill file.

Allternatively, you can add an entry manually to your `AGENTS.md` or `CLAUDE.md` file like this:

```markdown
<!-- @utilitywarehouse/hearth-react — AI skill for component library usage guidance -->

@node_modules/@utilitywarehouse/hearth-react/SKILL.md
```

or if you are using a monorepo with the Hearth React package in a subdirectory, you can add an entry like this:

```markdown
<!-- @utilitywarehouse/hearth-react — AI skill for component library usage guidance -->

@../../node_modules/@utilitywarehouse/hearth-react/SKILL.md
```

We recommend having `v0.29.6` or later of the Hearth React package installed,
as this version includes the latest updates to the skill.

## MCP Server

The remote [MCP Server](https://main--68dbda8270df9c2a6568ece8.chromatic.com/mcp),
built on the [Storybook MCP Server](https://storybook.js.org/docs/ai/mcp/overview#docs),
provides tools for agents to use Hearth React documentation and components.

It is referenced in the Hearth React Agent Skill, so your agent can access it
remotely if you have the skill installed, and the MCP server configured in your
agent.

To configure your agent to use the MCP server, you can add an entry to your
configuration file like this:

```json
{
  "servers": {
    "hearth-react": {
      "url": "https://main--68dbda8270df9c2a6568ece8.chromatic.com/mcp",
      "type": "http"
    }
  }
}
```

This is an example for adding to the VS Code `mcp.json` file, but the
configuration format may vary depending on your agent. We are in the process of
adding support for the MCP Server to the organisation's Claude configuration.
