---
status: accepted
---

# Consumer repos run the bump action from their own caller workflow

The bump action lives in the public `hearth` repo, but it runs in each consumer repo. Each one adds a small scheduled caller workflow that calls the action with that repo's own credentials. Design Systems opens the adoption PR in each consumer repo and agrees it with the owning team there. We chose this so Design Systems never needs write access to other teams' repos.

## Considered options

- **Central scheduled workflow in `hearth` that opens PRs in every consumer repo.** Rejected. It needs a token or App with write access to repos other teams own, and a permissions conversation with each team and with platform. It also runs on repos that never agreed to it.

## Consequences

- Each new consumer repo adopts the action through its own PR. A README section in `hearth` explains how.
- A consumer opts out by removing its caller workflow. Closing a bump PR is not opting out: the next run opens a fresh one.
