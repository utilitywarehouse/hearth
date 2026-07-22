# AI Tooling

- [Plugin](#plugin)
  - [Claude CLI](#claude-cli)
  - [Claude Desktop](#claude-desktop)
- [llms.txt and markdown docs](#llms-txt-and-markdown-docs)
- [Agent Skill](#agent-skill)
- [Hearth React Native MCP Server](#hearth-react-native-mcp-server)

The Hearth React Native AI Tools are intended to help your AI agents use Hearth
React Native components to build Utility Warehouse UIs. They provide access to
APIs, component documentation and usage guidelines, so your agent has the
context it needs to build with Hearth correctly.

If you're building UI from a design in Figma, start with Figma's MCP Server.
This should be the first step, since it gives your agent direct access to the
design you're implementing. You can read more information about setting this up
in the [root AI Toolkit documentation](https://hearth.prod.uw.systems/?path=/docs/ai-toolkit--docs).

Hearth's own AI tooling then supplements it for most use cases, filling in the
parts of the Hearth React Native API and usage guidance that the design alone
doesn't capture:

- [llms.txt](https://hearth.prod.uw.systems/react-native/llms.txt) and markdown docs
- [SKILL.md](https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/SKILL.md)
- [Hearth MCP Server](https://main--68e3ad5c6e80b57678cad6c6.chromatic.com/mcp)

## Plugin

The Hearth AI Toolkit plugin is the recommended way to set up your agent with
the Hearth React Native AI Tools. It will automatically add the `hearth-react-native`
skill and MCP server to your agent configuration, and ensure that your agent has
access to the latest Hearth React Native documentation and usage guidance.

### Claude CLI

```console
/plugin marketplace add utilitywarehouse/hearth
/plugin install hearth-ai-toolkit@hearth-plugins
```

### Claude Desktop

In the desktop app, click on **Customize** in the sidebar, then navigate to
**Plugins**. In the **Add** menu, choose **Add Marketplace**, then select the
**utilitywarehouse/hearth** repository, and click **Sync**.

This will add the `hearth-plugins` marketplace to Claude, and if you then click
the **+** symbol in the corner of the Hearth Design Systems card, you will have
the plugin installed and ready to use.

See the [root AI Toolkit documentation](https://hearth.prod.uw.systems/?path=/docs/ai-toolkit--docs)
for the full plugin scope (it also covers `hearth-react`), and for how to
combine it with the Figma MCP Server.

## llms.txt and markdown docs

The [llms.txt](https://hearth.prod.uw.systems/react-native/llms.txt) file is a list of
all Hearth React Native documentation, and each documentation page has a corresponding
markdown, file for use by AI agents.

This documentation is also included in the Hearth React Native package, so your agent
can access it locally if you have the package installed. The easiest way to do
this is via the Hearth React Native Agent Skill.

## Agent Skill

The [Hearth React Native Agent Skill](https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/SKILL.md)
is a skill for your AI agent to use when building any React Native UI.

This skill is focused on usage of the Hearth React Native component library, and
doesn't attempt to cover any other aspects of building a React application, or
local custom components.

The skill is packaged with the Hearth React Native package, so your agent can access
it locally if you have the package installed. To ensure your agent has access
to the skill, you can add an entry to your local `AGENTS.md` or `CLAUDE.md` file.

You can do this by using the `init-ai` tool:

```console
npx @utilitywarehouse/hearth-react-native init-ai
```

This will add an entry to your `AGENTS.md` or `CLAUDE.md` file pointing to the
skill file.

Alternatively, you can add an entry manually to your `AGENTS.md` or `CLAUDE.md`
file like this:

```markdown
<!-- @utilitywarehouse/hearth-react — AI skill for component library usage guidance -->

@node_modules/@utilitywarehouse/hearth-react-native/SKILL.md
```

or if you are using a monorepo with the Hearth React Native package in a subdirectory,
you can add an entry like this:

```markdown
<!-- @utilitywarehouse/hearth-react-native — AI skill for component library usage guidance -->

@../../node_modules/@utilitywarehouse/hearth-react-native/SKILL.md
```

We recommend having `v0.34.5` or later of the Hearth React Native package installed,
as this version includes the latest updates to the skill.

## Hearth React Native MCP Server

The remote [Hearth React Native MCP Server](https://main--68e3ad5c6e80b57678cad6c6.chromatic.com/mcp),
built on the [Storybook MCP Server](https://storybook.js.org/docs/ai/mcp/overview#docs),
provides tools for agents to use Hearth React Native documentation and components.

It is referenced in the Hearth React Native Agent Skill, so your agent can access it
remotely if you have the skill installed, and the MCP server configured in your
agent.

To configure your agent to use the MCP server, you can add an entry to your
configuration file like this:

```json
{
  "servers": {
    "hearth-react-native": {
      "url": "https://main--68e3ad5c6e80b57678cad6c6.chromatic.com/mcp",
      "type": "http"
    }
  }
}
```

This is an example for adding to the VS Code `mcp.json` file, but the
configuration format may vary depending on your agent. We are in the process of
adding support for the MCP Server to the organisation's Claude configuration.
