---
status: accepted
---

# Caller workflows reference the bump action at `@main`

Caller workflows reference the bump action at `utilitywarehouse/hearth/...@main`, not at a tag or commit SHA. Consumers get every fix straight away and never have to update their caller workflow. In return, each consumer repo trusts whatever is on `hearth` `main`: newly merged action code runs inside the consumer repo with the App token or PAT from ADR 0006, and could leak that token or make any write it allows, whether or not a bump PR is ever merged. Opening a PR is the action's intended behaviour, not a security boundary.

## Consequences

- Changes to the bump action are live in every consumer repo as soon as they merge, so they need the review we'd give code with write access to those repos.
- The token passed to the action gets only the permissions bump PRs need (contents and pull requests on that repo), which limits what a bad change on `main` can do.

## Considered options

- **Moving major tag (for example `@bump-v1`).** Rejected. It needs a tag release process next to changesets, which Hearth doesn't have.
- **Commit SHA kept current by Dependabot's `github-actions` ecosystem.** Rejected. It depends on Dependabot version updates, which js-mono has turned off.
