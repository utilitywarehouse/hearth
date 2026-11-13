# CLI vs MCP benchmark (UWDS-5207)

Decides whether the thin CLI-backed MCP that [ADR 0001](../adr/0001-cli-first-agent-docs-for-non-component-packages.md)
defers is worth building. **Status: protocol written, not yet run.** Results go in the table at the end.

## Arms

- **A, CLI.** Claude Code with the `hearth-cli` plugin skill. No MCP for tokens, icons or assets.
- **B, MCP.** The same session with no `hearth-cli` skill and a throwaway stdio MCP server over the same lookup code
  as `packages/cli/src` (tools: `tokens_search`, `tokens_get`, `icons_search`, `icons_get`, `assets_search`,
  `assets_get`, each returning the CLI's `--json` document). The wrapper is not committed.

Same model and Hearth package versions in both arms, in a scratch consumer project with `hearth-tokens`,
`hearth-react-icons` and `hearth-svg-assets` installed (plus `hearth-json-assets` and a React Native variant for
tasks 5 and 7). Fresh session per run, 3 runs per task per arm.

## Tasks

1. Find the icon for "bill" and give its import.
2. Pick the token for secondary text colour in a CSS module.
3. Pick the token for a brand-coloured background in a `.tsx` file.
4. Give both the CSS variable and the browser import for a spacing token.
5. In a React Native project, give the brand background token with its dark value.
6. List the logo SVG assets and import one.
7. Find an animated spot asset and say where its file is.
8. Ask for an icon that does not exist ("sparkle") and see what the agent does.

## Measured per run

Total tokens (input + output, from the session usage), number of turns, correct or not against a fixed answer key,
and whether the agent named a token, icon or asset the lookup did not return.

## Decision rule (fixed before running)

Recommend building the thin MCP only if, on the median task, arm B uses at least 25% fewer total tokens or at least
2 fewer turns than arm A **with equal correctness**, or if a client Hearth must support has no shell. Otherwise keep
the CLI-only decision in ADR 0001 and say so here.

## Sample-project check

Separately, in the scratch project with the plugin installed, ask Claude for tasks 1 and 2 without naming the CLI.
Record whether it runs `hearth` unprompted and whether the result is correct.

## Results

| Task | A tokens | A turns | A correct | B tokens | B turns | B correct | Invented names |
| ---- | -------- | ------- | --------- | -------- | ------- | --------- | -------------- |
| 1-8  | _pending_ |        |           |          |         |           |                |

Recommendation: _pending_.
