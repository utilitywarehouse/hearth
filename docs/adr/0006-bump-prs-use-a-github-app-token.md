---
status: accepted
---

# Bump PRs are opened with a GitHub App token, not `GITHUB_TOKEN`

GitHub doesn't trigger `pull_request` or `push` workflows for events made with a repo's own `GITHUB_TOKEN`. A bump PR opened that way would show no CI and no visual checks, so reviewers would have nothing to judge it by. The bump action therefore takes a token as input. Caller workflows pass a short-lived GitHub App token, with a PAT from the existing machine user as the fallback if no suitable App is available. The action doesn't care where the token comes from.

## Considered options

- **`GITHUB_TOKEN`, with the action starting CI itself through `workflow_dispatch`.** Rejected. Dispatch runs on the bump branch would report checks on the PR's head commit, but every consumer CI workflow would need a `workflow_dispatch` trigger and could no longer rely on the `pull_request` event (PR number, base ref, changed files) that tools such as visual-review checks read. Each consumer would have to adapt its CI to the bump action, rather than the other way round.
- **Machine-user PAT as the default.** Kept only as the fallback. It's a long-lived credential tied to a user account.

## Consequences

- An App, or the machine user, has to be installed on or have access to every consumer repo before it can adopt the action.
- Bump PRs show as authored by the App or the machine user.
