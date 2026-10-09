---
name: hearth-react-planning
description: "Use when a product team is scoping or breaking down feature work that will use `@utilitywarehouse/hearth-react` — before any code is written. Takes a Linear ticket, a freeform feature description, or a Figma link, maps the ask onto the real Hearth React component inventory, and writes the resulting task breakdown back to Linear as sub-issues naming the specific components/variants to use. Flags anything Hearth doesn't yet support and offers to file it via `design-systems-feedback`. Scoped to `packages/react` consumers only — there is no react-native equivalent yet. Sits before `hearth-react` (implementation-time component guidance) and `hearth-react-review` (post-implementation audit) in the workflow — use this one first, at the scoping stage."
argument-hint: "Linear ticket, feature description, or Figma link"
---

# Hearth React Planning

Turns an early-stage feature ask into a Hearth-aware task breakdown, before
any implementation starts. `hearth-react` already has a lightweight "Plan
before writing" checklist for in-session use once someone is about to write
code — this skill is the step before that: scoping a ticket against the real
component inventory and leaving a durable breakdown in Linear, not just a
one-off chat answer.

## Scope

Covers `packages/react` consumers only, matching `hearth-react-review`'s
scope — there is no react-native equivalent yet. It does not check Figma
parity pixel-for-pixel (`figma-implementation` does that at build time); a
Figma link here is only read for *what's being asked for*.

## Prerequisite

This needs the official Linear plugin (`linear@claude-plugins-official`)
installed and enabled — it provides the `mcp__plugin_linear_linear__*` tools
this skill calls to read the ticket and create sub-issues. If those tools
aren't available, say so plainly rather than guessing at an alternative.

## 1. Gather the ask

Accept any combination of:

- A Linear ticket ID/link — read its description and comments.
- A freeform description in chat.
- A Figma link — read it for the feature's intent, not for pixel-level
  comparison.

Only ask follow-up questions if the ask is genuinely too vague to map onto
components (e.g. "build a settings page" with no detail on what it contains).
If there's already enough to work with, don't interrogate further.

## 2. Discover what's available

Call the `hearth-react` MCP server's `docs-list`/`docs-show` tools — the same
ones `hearth-react` and `hearth-react-review` use — to get the real, current
component inventory. Never assume a component or prop exists beyond what
these tools confirm; this is the same rule `hearth-react-review` applies when
reviewing existing code, applied here before any code exists.

`docs-list` only confirms that a name exists somewhere in the catalogue — it's
a table of contents, not proof of a component's actual props or behaviour.
Naming a component in the breakdown on the strength of `docs-list` alone (or
because it showed up in another component's story code) reintroduces the
exact hallucination risk this skill exists to prevent, just one level
removed: the component is real, but the specific prop or variant you're about
to recommend might not be. Before any component or prop appears in the final
breakdown, pull its own `docs-show` entry — don't settle for "it's in the
inventory" or "I saw it used elsewhere" as a stand-in for checking the
component directly.

## 3. Map ask → components

For each piece of functionality in the ask, identify the Hearth component(s),
variant, and props that cover it. Prefer composing existing components over
anything new — the same "compose, don't reinvent" principle `hearth-react`
states for implementation-time use.

## 4. Identify gaps

Anything the mapping can't cover with existing Hearth components is a gap.
Flag it in the output, and offer — don't auto-file — to hand off to
`design-systems-feedback` to report it to the Design Systems triage queue.

## 5. Draft the breakdown

One candidate sub-issue per task: a title, a short description, and the
specific Hearth component(s)/props named. If a component makes it into a
sub-issue without its own `docs-show` call behind it — easy to miss for
secondary or incidental components that aren't the main focus of a task —
go back and verify it now rather than shipping the gap in the draft.
Present the full draft to the user before writing anything — this creates
records in another team's shared tracker that other people will see.

## 6. Confirm, then write

On explicit confirmation, create the sub-issues under the parent Linear
ticket. If the user's original ask already authorized direct creation,
showing the draft doubles as the confirmation and no second round-trip is
needed (same carve-out `design-systems-feedback` uses).

## 7. Report back

Summarize what was created, with links to the new sub-issues.

## What this skill deliberately doesn't do

No duplicate-issue search against existing sub-issues, no priority or
assignee setting — none of that was asked for. No code generation: this
produces a plan, not an implementation — `hearth-react`'s own "Plan before
writing" checklist still governs once someone actually starts writing code.
No Figma pixel-parity checking — that's `figma-implementation`'s job.
