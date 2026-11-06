# Issue tracker: Linear

Issues and specs for this repo live in Linear, team `UWDS` (keys like `UWDS-5197`). They are not tracked in GitHub Issues. PRs and changesets stay on GitHub.

## Conventions

- Use the connected Linear MCP tools: `list_issues`, `get_issue`, `save_issue`, `list_comments`, `save_comment`. Tools accept human-readable references (`UWDS-123`, team name `UWDS`, `me`).
- `get_issue` does not include comments; call `list_comments` for the discussion.
- Before creating an issue, search with `list_issues` (use `query`) for duplicates.
- Statuses and labels are per-team: call `list_issue_statuses` / `list_issue_labels` for `UWDS` before setting them.
- `save_issue` creates when `id` is omitted (`team` required) and updates when `id` is passed.
- Branches are named after the ticket (e.g. `robphoenix-uwds-5197`); reference the key in PR titles/commits (e.g. `(UWDS-5271)`).

## When a skill says "publish to the issue tracker"

Create a Linear issue in team `UWDS` with `save_issue`.

## When a skill says "fetch the relevant ticket"

Run `get_issue` with the key, then `list_comments` for the discussion.
