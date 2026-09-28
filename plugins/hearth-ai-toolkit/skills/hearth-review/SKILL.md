---
name: hearth-review
description: "Use when: reviewing or auditing UI code that already uses `@utilitywarehouse/hearth-react` or `@utilitywarehouse/hearth-react-native` — e.g. reviewing a pull request, checking a screen or component against Hearth's API and design-token rules before merge, or auditing existing code for hallucinated props, accessibility gaps, or token misuse. Covers consumer usage only — for auditing the Hearth libraries themselves, see `react-audit` (library completeness) or `oversight-lint` (library docgen completeness)."
argument-hint: "File(s) or PR to review, and which package (react or react-native)"
---

# Hearth Review

Reviews UI code that has already been written against
`@utilitywarehouse/hearth-react` or `@utilitywarehouse/hearth-react-native`,
checking for exactly the issues the `hearth-react`/`hearth-react-native`
generation skills exist to prevent in the first place: hallucinated or
deprecated props, design-token misuse, accessibility gaps, and layout
anti-patterns.

## Scope

This reviews **consumer usage** of Hearth — a PR, a screen, a component, or a
diff in an app that imports one of the two packages. It does not audit the
Hearth libraries themselves:

- Library completeness (missing stories/docs/Figma Code Connect files) → `react-audit`
- Library docgen completeness, so the MCP server has good data to serve → `oversight-lint`/`storybook-addon-oversight`

## Step 1: Load the matching package skill

Load `hearth-react` or `hearth-react-native` — whichever package the code
under review imports — alongside this skill. Its "Critical Rules" and
"Accessibility" sections **are** the checklist below; this skill doesn't
restate them, so if they've changed since this was written, the package
skill wins. Re-read them now rather than relying on memory from an earlier
session.

## Step 2: Re-verify every component/prop actually used

Never trust that a prop already in the code under review is real. For each
Hearth component and prop referenced, confirm it exists via the MCP
`docs-list`/`docs-show` tools (or the raw markdown fallback) before flagging
or clearing it. This is `figma-implementation` rule 2 — "never substitute
local inspection for `docs-show`" — applied to code that already exists
instead of code about to be written: the component already being in the
codebase is not evidence it's correct. Reviewing someone else's diff is
exactly the scenario that rule is for.

## Checklist

Work through each category, checking against the specific section of the
loaded package skill named alongside it:

- **Hallucinated or deprecated props/components** — every prop/component
  used exists per `docs-show`, and isn't a prop the docs no longer list (a
  sign it was removed in a version bump the code wasn't updated for).
- **Layout anti-patterns** — margin on siblings instead of `gap`/
  `justifyContent`/`align` on the parent; a hardcoded `maxWidth` that's
  actually a grid-derived span; a responsive prop object missing the
  required base breakpoint (`mobile` on web, `base` on RN). See "Use layout
  components" and "Responsive props"/"Responsive breakpoints".
- **Token misuse** — raw hex/px values where a token exists; a spacing token
  used for a non-spacing dimension; a CSS variable string used in JS/TS/JSX/
  TSX (web) instead of a browser token; a value pulled from the wrong token
  category. See "Use style props first", "Browser tokens in JS, CSS
  variables in CSS" (web), and the theme-token rules (RN).
- **Accessibility gaps** — missing `as` on `Heading`; a standalone icon with
  no `title`/`titleId`; a non-decorative image with no meaningful `alt`; on
  RN, a missing or overridden `accessibilityRole`/`accessibilityLabel`/
  `accessibilityState`, or hand-rolled labels on a `FormField`-wrapped
  input. See the package skill's "Accessibility" section.
- **Compound-component misuse** — a component's documented sub-components
  skipped or replaced with ad-hoc markup (e.g. custom markup instead of
  `CardActions`/`ModalContent`, or state duplicated instead of read from the
  component's own context). See "Compound components".

## Findings and prioritisation

Group findings into tiers — don't report a flat list:

| Tier | What | Why |
|------|------|-----|
| 1 — Blocking | Hallucinated/deprecated prop that will error or silently no-op; missing accessibility attribute Hearth doesn't wire automatically | Breaks at runtime or fails a real accessibility requirement |
| 2 — Should fix | Token misuse; a layout anti-pattern that still renders correctly today | Works now but fights the design system, or breaks on the next token/breakpoint change |
| 3 — Nice to have | A more idiomatic prop/variant exists but the current code isn't wrong | Cosmetic/maintainability only |

## Report and fix workflow

1. Report findings grouped by tier before changing anything — this is a
   review, not an autofix.
2. If asked to fix: fix by tier, smallest safe group first; re-run
   `docs-show` for any component being touched rather than assuming an
   earlier verification in this session still holds.
3. Stop and confirm with the user at each PR-sized boundary rather than
   pushing every fix through in one pass.
