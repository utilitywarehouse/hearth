---
status: accepted
---

# Nudge consumer repos with a Hearth bump action, not Dependabot or Renovate

Consumer repos drift behind Hearth releases, and every bump so far has been made by hand. We will publish our own bump action that opens one bump PR per consumer repo, on the 1st and 15th of each month, and say in its body what the repo gains and what breaks, built from `hearth changes`. Hearth dependencies are bumped by this action, not by the consumer repo's dependency bot.

## Considered options

- **Dependabot group for `@utilitywarehouse/hearth-*`.** Rejected. Its PR body is generic release notes, so it can't say "3 minors behind, missing `VisuallyHidden`" or put breaking changes and migration codemods first. Dependabot could otherwise do the job: an `allow` rule can limit version updates to Hearth packages, and a `cron` schedule can run on the 1st and 15th. But each consumer would still have to change its own Dependabot config, which js-mono has deliberately set to security updates only, and the PR body is the point of the nudge.
- **Renovate.** Rejected for the same PR-body reason, and neither consumer repo uses it.
- **Reminders only (issue, Slack).** Rejected. A ready-made PR is the most actionable nudge, because the work is already done.
