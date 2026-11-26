---
name: design-systems-feedback
description: Files the user's Hearth feedback (wrong or missing docs, hallucinated prop, slow MCP tool, Code Connect gap, praise) as a Linear issue in UWDS triage. Use for "let design systems know" or when you hit a rough edge in a Hearth skill.
---

# Design Systems feedback → Linear

Feedback about Hearth tooling tends to evaporate — a developer mentions it in
passing, Claude suggests they "report it to design systems", and nobody ever
does. This skill closes that loop by actually filing a Linear issue in the
Design Systems team's triage queue, so recurring doc gaps and prop mismatches
surface somewhere the team will see them.

## Prerequisite

This needs the official Linear plugin (`linear@claude-plugins-official`)
installed and enabled to actually file anything — it provides the
`mcp__plugin_linear_linear__*` tools this skill calls. If those tools aren't
available, say so plainly rather than guessing at an alternative.

## 1. Capture the feedback

Get the substance: what happened, which skill/workflow/component it relates
to (`hearth-react`, `hearth-react-native`, `figma-implementation`, a specific
Hearth component, the Storybook MCP server, etc.), and expected vs. actual
behaviour. This applies equally to a complaint and a compliment — don't force
a "bug" framing onto positive feedback.

Only ask follow-up questions if the feedback is genuinely too vague to act on
(e.g. "the hearth skill was bad" with no specifics). If the user has already
given enough detail to write a clear issue, don't interrogate them further.

## 2. Identify the reporter

The issue will be created under the shared Linear integration's identity, not
the person actually giving the feedback, so attribution has to be written
into the issue itself. Get it from git:

```bash
git config user.name
git config user.email
```

If that command is blocked (e.g. denied by sandboxed Bash permissions) or
comes back empty, don't retry it — check whether identity info is already
visible in your session/environment context first (a git status banner
naming the user is usually enough), and only ask the user directly if nothing
is available either way. Design Systems needs to know who to follow up with,
but a blocked shell command shouldn't stall the whole report.

## 3. Draft the issue

- **Title**: concise and specific — e.g. "Hearth React: `Card` docs don't
  mention the `shadow` prop doesn't exist", not "Feedback on Hearth".
- **Description** (Markdown, literal newlines — don't escape it): the
  feedback itself in the user's own words (cleaned up for clarity), followed
  by a context block:

  ```markdown
  ## Feedback
  <feedback, cleaned up>

  ## Context
  - Reported by: <name> (<email>)
  - Related skill/workflow: <e.g. hearth-react, figma-implementation>
  - Repo: <the actual repo/app being worked in — e.g. from the git remote or package.json name, not a fixed value>
  - Date: <today>
  ```

- **Team**: `Design Systems`.
- **State**: `Triage` — set this explicitly rather than relying on default
  routing.
- **Labels**: `["created by claude"]` — this label already exists on the
  Design Systems team for exactly this purpose, don't create a new one.
- Leave assignee and priority unset. Triaging and routing is Design Systems'
  job, not something to pre-judge on their behalf.

## 4. Confirm before filing

Show the user the exact title and description you're about to send, and wait
for a go-ahead before calling `save_issue`. This creates a record in another
team's shared tracker that other people will see — treat it with the same
"show scope, then act" care as any other hard-to-reverse or externally
visible action. The only exception is when the user's own request already
gave explicit instruction to create it without further check-in — in that
case, showing the draft doubles as the confirmation and you don't need a
second round-trip.

## 5. Report back

Once created, give the user the issue's identifier and URL.

## What this skill deliberately doesn't do

No duplicate search against existing issues, no priority-setting, no
assignee logic. None of that was asked for, and Design Systems' own triage
process already handles routing and dedup — adding it here would just be
guessing at their process.
