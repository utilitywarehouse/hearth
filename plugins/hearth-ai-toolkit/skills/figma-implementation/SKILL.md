---
name: figma-implementation
description: MANDATORY prerequisite — you MUST load this skill BEFORE adapting Figma `get_design_context` reference output into a Hearth React or Hearth React Native page, screen, or component, alongside whichever of the `hearth-react` / `hearth-react-native` skills applies. Covers the Figma-to-code verification workflow — resolving an ambiguous node/URL before fetching context, per-file re-checks, never substituting local/`node_modules` inspection for `docs-show`, why Figma variable names outrank rendered pixel fallbacks, the mechanical check for mapping a Figma spacing variable to the right prop, Code Connect ownership boundaries, and decoupling component props from raw bound data shapes. Does not cover component APIs — that's what `hearth-react`/`hearth-react-native` are for.
---

# Figma-to-code verification workflow

This skill governs *how* you verify a Figma-to-code translation, independent of
which Hearth package (`hearth-react` or `hearth-react-native`) you're targeting.
Load the matching package skill alongside this one for the actual component API.

## 1. Resolve ambiguous Figma references before fetching context

Before calling `get_design_context`, check whether the node/URL actually
points at one specific frame. If there's no node-id, multiple candidate
frames match a description, or a file/page reference has no clear target
node, ask the user to confirm which node/frame is meant — don't guess (e.g.
"pick the first match" or "the most likely frame"). A wrong guess burns the
call on the wrong node and produces a confidently wrong implementation with
no signal that anything went wrong.

## 2. Verify per file, not once per session

On a multi-screen or multi-file ticket, re-verify against the Figma spec for
**each** file before writing it. A check done for the first screen does not
carry over to the rest — a later screen can differ in spacing, variant, or
structure even when it looks similar at a glance. Re-run `get_design_context`
(or re-read the relevant frame) per file, not once at the start of the ticket.

## 3. Never substitute local inspection for `docs-show`

A `node_modules` type-definition check, reading a component's local source, or
finding sibling code that already does something a certain way is **not**
evidence of correctness and is **not** a substitute for `docs-show` (or the
raw markdown docs fallback) — including mid-debugging, and including when the
sibling code looks authoritative. Existing code may itself be wrong, stale, or
solving a different problem; verify independently against the docs every time,
not just the first time.

## 4. Figma variable names are authoritative over rendered pixel values

A Figma export can show the same bound variable rendering a different pixel
value on different screens or breakpoints. Match by the variable's **name**
(its tier, e.g. `lg`, `2xl`), never by eyeballing or copying the pixel number
shown for one instance — the name is the source of truth, the px value is
just that screen's resolved output.

## 5. Mechanical check: spacing variable path → `spacing` prop, never `gap`

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

## 6. Code Connect mappings are owned by the design systems team

Never create, edit, or send Code Connect mappings (`.figma.ts` files,
`add_code_connect_map`, `send_code_connect_mappings`) while implementing a
design as code — even when `get_design_context` or
`get_code_connect_suggestions` reports a missing or stale mapping. Report the
gap instead (component name + Figma node) so the design systems team can
action it. Authoring Code Connect mappings is a separate, explicitly-requested
task (see the `figma-code-connect` skill), not something to do as a side
effect of implementing a page or component.

## 7. Decouple component props from the raw data shape bound in Figma

When a Figma frame's content is driven by a data source reflected in the
design (e.g. a GraphQL query result populating a list of rows on a card),
don't type the new component's props as the raw query/data type. Define a
minimal structural interface containing only the fields the component
actually renders (e.g. a `ServiceLike` type rather than
`Query['services'][number]`), and adapt the real data to it at the call site.
This keeps the component reusable and decoupled from any one query's shape.
