---
status: accepted
---

# Caller workflows reference the bump action at `@main`

Caller workflows reference the bump action at `utilitywarehouse/hearth/...@main`, not at a tag or commit SHA. Consumers get every fix straight away and never have to update their caller workflow. A bad change on `main` affects every consumer's next run at once, but the action only opens or updates a PR, so a mistake shows up as a missing or wrong PR, never as broken consumer code. Changes to the action should be treated as live for every consumer repo as soon as they merge.

## Considered options

- **Moving major tag (for example `@bump-v1`).** Rejected. It needs a tag release process next to changesets, which Hearth doesn't have.
- **Commit SHA kept current by Dependabot's `github-actions` ecosystem.** Rejected. It depends on Dependabot version updates, which js-mono has turned off.
