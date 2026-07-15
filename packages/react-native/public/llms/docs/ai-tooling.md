# AI Tooling

- [Figma MCP Server](#figma-mcp-server)
- [llms.txt and markdown docs](#llms-txt-and-markdown-docs)
- [Agent Skill](#agent-skill)
- [Hearth MCP Server](#hearth-mcp-server)

The Hearth React Native AI Tools are intended to help your AI agents use Hearth React Native
components to build Utility Warehouse UIs. They provide access to APIs,
component documentation and usage guidelines, so your agent has the context it
needs to build with Hearth correctly.

If you're building UI from a Figma design, start with Figma's own
[Figma MCP Server](#figma-mcp-server), for most people building UI, this is
the first step, since it gives your agent direct access to the design you're
implementing. Hearth's own AI tooling then supplements it for most use cases,
filling in the parts of the Hearth React Native API and usage guidance that
the design alone doesn't capture:

- [llms.txt](https://hearth.prod.uw.systems/react-native/llms.txt) and markdown docs
- [SKILL.md](https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/SKILL.md)
- [Hearth MCP Server](https://main--68e3ad5c6e80b57678cad6c6.chromatic.com/mcp)

## Figma MCP Server

If you're implementing a Figma design, this should be the first tool you reach
for. Figma's [Dev Mode MCP Server](https://developers.figma.com/docs/figma-mcp-server/)
gives your agent direct access to the design file itself, layout, variables,
and generated code for a selected frame or component. This is a Figma-provided
tool, separate from the Hearth MCP Server below.

Figma recommends the **remote server** for most people, as it supports the
broadest set of features. Add an entry to your `mcp.json` file:

```json
{
  "servers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp",
      "type": "http"
    }
  }
}
```

See Figma's [remote server installation guide](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/)
for the full setup flow, including the OAuth step required to grant the server
access to your Figma account.

Alternatively, a **local server** runs from the Figma desktop app itself (Dev
Mode → enable desktop MCP server), which some organisations use instead of the
remote option:

```json
{
  "servers": {
    "figma-desktop": {
      "url": "http://127.0.0.1:3845/mcp",
      "type": "http"
    }
  }
}
```

See Figma's [local server installation guide](https://developers.figma.com/docs/figma-mcp-server/local-server-installation/)
for prerequisites and setup.

### Works with Hearth components

Hearth publishes [Figma Code Connect](https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect)
mappings for its React Native components. In practice, this means: when the
Figma frame you're implementing uses a component we've mapped, the Figma MCP
Server returns real Hearth code, for example `<Button variant="emphasis">`,
rather than generic markup reconstructed from layer names and styles. You
don't need to know how these mappings work under the hood, just that a mapped
component gets you code that's ready to use, with little to no rework needed.

### Supplement it with Hearth's AI tooling

The Figma MCP Server tells your agent what design it's looking at, and, via
Code Connect, which Hearth component to use. It doesn't know the rest of the
Hearth React Native API: prop combinations a mapping doesn't cover,
accessibility guidance, or usage conventions.

For most use cases, that's exactly what the tools below are for. Set up the
Figma MCP Server alongside the Hearth Agent Skill and/or Hearth MCP Server,
rather than in place of them, so your agent can confirm the full prop API,
correct usage, and any guidance the Figma mapping doesn't capture.

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

## Hearth MCP Server

The remote [Hearth MCP Server](https://main--68e3ad5c6e80b57678cad6c6.chromatic.com/mcp),
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
