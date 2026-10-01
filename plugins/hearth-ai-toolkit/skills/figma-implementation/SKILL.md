---
name: figma-implementation
description: MANDATORY prerequisite — you MUST load this skill BEFORE adapting Figma `get_design_context` reference output into a Hearth React or Hearth React Native page, screen, or component, alongside whichever of the `hearth-react` / `hearth-react-native` skills applies. Covers the Figma-to-code verification workflow — per-file re-checks, never substituting local/`node_modules` inspection for `docs-show`, why Figma variable names outrank rendered pixel fallbacks, and the mechanical check for mapping a Figma spacing variable to the right prop. Does not cover component APIs — that's what `hearth-react`/`hearth-react-native` are for.
---

# Figma-to-code verification workflow

This skill governs *how* you verify a Figma-to-code translation, independent of
which Hearth package (`hearth-react` or `hearth-react-native`) you're targeting.
Load the matching package skill alongside this one for the actual component API.

## 1. Verify per file, not once per session

On a multi-screen or multi-file ticket, re-verify against the Figma spec for
**each** file before writing it. A check done for the first screen does not
carry over to the rest — a later screen can differ in spacing, variant, or
structure even when it looks similar at a glance. Re-run `get_design_context`
(or re-read the relevant frame) per file, not once at the start of the ticket.

## 2. Never substitute local inspection for `docs-show`

A `node_modules` type-definition check, reading a component's local source, or
finding sibling code that already does something a certain way is **not**
evidence of correctness and is **not** a substitute for `docs-show` (or the
raw markdown docs fallback) — including mid-debugging, and including when the
sibling code looks authoritative. Existing code may itself be wrong, stale, or
solving a different problem; verify independently against the docs every time,
not just the first time.

## 3. Figma variable names are authoritative over rendered pixel values

A Figma export can show the same bound variable rendering a different pixel
value on different screens or breakpoints. Match by the variable's **name**
(its tier, e.g. `lg`, `2xl`), never by eyeballing or copying the pixel number
shown for one instance — the name is the source of truth, the px value is
just that screen's resolved output.

## 4. Mechanical check: spacing variable path → `spacing` prop, never `gap`

If a Figma variable bound to a node has a path containing the segment
`spacing` (e.g. `layout/spacing/lg`, `layout/content/spacing-lg`), use that
component's `spacing` prop with the matching tier name — never `gap`. This is
a forced, mechanical lookup: search the Figma export for the `spacing`
segment first, before making any judgment call about which prop "looks right".
Reserve `gap` for adjustments that don't correspond to any named Figma
variable.

The exact variable path differs by which component the value is bound to
(e.g. one path for a flex/grid-style container, a different path for a
page-level content container) but both map to the same `spacing` prop and the
same value scale — treat either path the same way. Check the relevant package
skill (`hearth-react` or `hearth-react-native`) for that package's specific
variable-path-to-component mapping.
