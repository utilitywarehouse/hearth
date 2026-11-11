---
name: hearth-react-review
description: "Use when: reviewing or auditing UI code that already uses `@utilitywarehouse/hearth-react` — e.g. reviewing a pull request, checking a screen or component against Hearth's API and design-token rules before merge, or auditing existing code for hallucinated props, accessibility gaps, or token misuse. Scoped to `packages/react` consumers only — there is no react-native equivalent yet. Covers consumer usage only — for auditing the Hearth libraries themselves, see `react-audit` (library completeness) or `oversight-lint` (library docgen completeness)."
argument-hint: "File(s) or PR to review"
---

# Hearth React Review

Reviews UI code that has already been written against
`@utilitywarehouse/hearth-react`, checking for exactly the issues the
`hearth-react` generation skill exists to prevent in the first place:
hallucinated or deprecated props, design-token misuse, accessibility gaps,
and layout anti-patterns.

## Scope

This reviews **consumer usage** of Hearth React — a PR, a screen, a
component, or a diff in an app that imports `@utilitywarehouse/hearth-react`.
There is no react-native equivalent yet. It does not audit the Hearth
libraries themselves:

- Library completeness (missing stories/docs/Figma Code Connect files) → `react-audit`
- Library docgen completeness, so the MCP server has good data to serve → `oversight-lint`/`storybook-addon-oversight`

## Step 1: Load `hearth-react`

Load the `hearth-react` skill alongside this one. Its "Critical Rules" and
"Accessibility" sections **are** the checklist below; this skill doesn't
restate them, so if they've changed since this was written, the package
skill wins. Re-read them now rather than relying on memory from an earlier
session.

## Step 2: Re-verify every component/prop actually used

Never trust that a prop already in the code under review is real. For each
Hearth component and prop referenced, confirm it exists via the `hearth-react`
MCP server's `docs-list`/`docs-show` tools (or the raw markdown fallback)
before flagging or clearing it. This is `figma-implementation` rule 3 —
"never substitute local inspection for `docs-show`" — applied to code that
already exists instead of code about to be written: the component already
being in the codebase is not evidence it's correct. Reviewing someone else's
diff is exactly the scenario that rule is for.

Fetch each component's `<component-id>--docs` entry as well as its plain
entry. Built-in behaviour (e.g. `Link` adding an open-in-new-tab icon for
`target="_blank"`), documented patterns (e.g. Button's "Full width button")
and "Alternatives" (e.g. `InlineLink` for links in body text) are only
described there. Check them before suggesting custom code too: a review
comment that asks for something Hearth already does creates the problem
this skill exists to catch.

## Checklist

Work through each category, checking against the specific section of
`packages/react/SKILL.md` named alongside it:

- **Hallucinated or deprecated props/components** — every prop/component
  used exists per `docs-show`, and isn't a prop the docs no longer list (a
  sign it was removed in a version bump the code wasn't updated for).
- **Layout anti-patterns** — margin on siblings instead of `gap`/
  `justifyContent`/`alignItems` on the parent; a hardcoded `maxWidth` that's
  actually a grid-derived span; a responsive prop object missing the
  required `mobile` breakpoint. See "Use layout components" and "Responsive
  props".
- **Token misuse** — raw hex/px values where a token exists; a spacing token
  used for a non-spacing dimension; a CSS variable string used in
  JS/TS/JSX/TSX instead of a browser token; an inline `style` for something
  a style prop covers (e.g. `style={{ flex: 1 }}` on a `Box` instead of
  `flex="1"`). See "Use style props first" and "Browser tokens in JS, CSS
  variables in CSS".
- **Reimplemented built-in behaviour or documented patterns** — custom code
  doing what the component already does (e.g. visually hidden "(opens in
  new tab)" text on a `Link` with `target="_blank"`); `asChild` used to
  render the element the component already renders (`<Link asChild><a>`); a
  component used where its docs name an alternative for that context
  (`Link` inside body text instead of `InlineLink`); a documented pattern
  replaced with a workaround (`style={{ width: '100%' }}` on a `Button`
  instead of a column `Flex` parent). Check each component's `--docs`
  entry, per Step 2.
- **Accessibility gaps** — missing `as` on `Heading`; a standalone icon with
  no `title`/`titleId`; a wrapper element added instead of using `asChild` to
  change the underlying HTML element; a non-decorative image with no
  meaningful `alt`. See "Accessibility".
- **Compound-component misuse** — a component's documented sub-components
  skipped or replaced with ad-hoc markup (e.g. custom markup instead of
  `CardActions`/`ModalContent`, or state duplicated instead of read from the
  component's own context). See "Compound components".

## Findings and prioritisation

Group findings into tiers — don't report a flat list:

| Tier | What | Why |
|------|------|-----|
| 1 — Blocking | Hallucinated/deprecated prop that will error or silently no-op; missing accessibility attribute Hearth doesn't wire automatically | Breaks at runtime or fails a real accessibility requirement |
| 2 — Should fix | Token misuse; a layout anti-pattern that still renders correctly today; reimplemented built-in behaviour or documented pattern | Works now but fights the design system, or breaks on the next token/breakpoint change |
| 3 — Nice to have | A more idiomatic prop/variant exists but the current code isn't wrong | Cosmetic/maintainability only |

## Report and fix workflow

1. Report findings grouped by tier before changing anything — this is a
   review, not an autofix.
2. If asked to fix: fix by tier, smallest safe group first; re-run
   `docs-show` for any component being touched rather than assuming an
   earlier verification in this session still holds.
3. Stop and confirm with the user at each PR-sized boundary rather than
   pushing every fix through in one pass.
