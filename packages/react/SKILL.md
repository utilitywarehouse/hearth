---
name: hearth-react
description: MANDATORY prerequisite — you MUST load this skill BEFORE writing or editing any file that imports from `@utilitywarehouse/hearth-react` or `@utilitywarehouse/hearth-react-icons`, BEFORE adapting Figma `get_design_context` reference output into a page or component in a Hearth app, and BEFORE delegating research about a Hearth component's props or usage to a subagent. NEVER substitute node_modules type definitions or a grep of existing usage for this skill's own component docs — that is how this skill gets silently bypassed. This skill IS the "target project's conventions" that figma-design-to-code hands off to; loading that skill does NOT satisfy this requirement. Do not wait for an explicit mention of "Hearth React" — any frontend UI work in an app with the library installed requires this skill first.
---

# Building with Hearth React

You are a frontend engineer turning Figma designs or written requirements into
React UI using Hearth, Utility Warehouse's design system.

## MANDATORY — when you must load this skill

Load this skill — do not skip it — at each of these moments:

- **Before writing or editing any file that imports from
  `@utilitywarehouse/hearth-react` or `@utilitywarehouse/hearth-react-icons`.**
  If the file touches either package, this skill MUST be loaded first, no
  exceptions.
- **Before adapting Figma `get_design_context` reference output into this
  codebase.** `figma-design-to-code` hands off with "adapt the reference code
  to the target project's conventions" without saying what those conventions
  are. This skill IS that answer. Loading `figma-design-to-code` does NOT
  satisfy this requirement — load both, this one before you touch the
  reference code.
- **Before delegating research about a Hearth component's props, variants, or
  usage to a subagent.** Reading `node_modules` type definitions or grepping
  existing usage in the app is NOT a substitute for this skill's own component
  docs (see "Discover before you implement" below). Spawning a research subagent to
  answer a question this skill already answers is how this skill gets
  silently bypassed — load this skill, or pass its instructions into the
  subagent's prompt, before delegating.
- **Alongside `figma-implementation`, whenever adapting Figma output into
  code.** That skill covers the Figma-to-code verification workflow —
  resolving an ambiguous node/URL before fetching context, per-file
  re-checks, why `docs-show` always outranks local inspection, the mechanical
  spacing-variable check, Code Connect ownership boundaries, and decoupling
  component props from raw bound data shapes; this skill covers the Hearth
  React component API itself. Load both together — neither substitutes for
  the other.

Treat each moment above as a hard gate, not a vague "this is UI work" prompt
to get around to eventually.

## Discover before you implement

The library is broad: check whether an existing component covers the need
before building anything custom.

### Check MCP access first

1. Look for the `hearth-react` tools (`docs-list`, `docs-show`,
   `docs-show-story`). If they aren't callable, search for them (e.g.
   ToolSearch for `hearth-react`): a deferred or still-connecting server only
   appears after a search, so an absent tool is not proof the server is
   missing.
2. Confirm with a live `docs-list` call. A returned catalogue means the
   server works.
3. If it is unavailable, tell the user the MCP server isn't connected and
   name the markdown fallback you are using. Don't switch silently, and don't
   substitute `node_modules` types.

**Default to the `hearth-react` MCP server** (bundled with the plugin;
otherwise `https://main--68dbda8270df9c2a6568ece8.chromatic.com/mcp`; its own
instructions explain `docs-list`, `docs-show`, `docs-show-story`). For a
component, fetch both its plain entry (props + story code) and its `<id>--docs` entry (narrative usage,
accessibility). Subcomponents (e.g. `CardActionLink`) have their own entries:
fetch them by their own id, not via the parent's `--docs` page.

If the MCP is unavailable, or you need a story's exact code, use the raw
markdown in the installed package. Resolve its root first (it is usually
hoisted in a monorepo):

```sh
node -e "const path = require('path'); console.log(path.dirname(require.resolve('@utilitywarehouse/hearth-react/package.json')))"
```

Then read `<root>/public/llms.txt` (index), `<root>/public/llms/components/`
(one file per component) and `<root>/public/llms/docs/` (tokens, layout,
typography, responsive design). Onboarding and MCP configuration:
[`public/llms/docs/a-i-toolkit.md`](public/llms/docs/a-i-toolkit.md).

## Plan before writing

For anything beyond a trivial change (new page, multi-component feature,
unfamiliar code), share a brief plan first: the Hearth components and why, any
local components, the file structure, and decisions with several reasonable
options. Small self-contained tasks can proceed directly.

## Principles

1. **Use Hearth React** for all web UI unless told otherwise.
2. **Use available components first**; check the docs before custom UI or native
   HTML elements.
3. **Compose, don't reinvent**: layout components plus style props; custom
   components or styles only when absolutely necessary.
4. **Built-in variants and style props before custom styles**
   (`variant="outline"`, `size="sm"`, `padding="200"`).
5. **Semantic colours** (`semantic.background.primary`), never raw values like
   `color.energyblue[500]`.
6. **CSS tokens in CSS files, browser tokens in JS/TS/JSX/TSX.** Never use CSS
   variables in JS; use JS tokens for UI only for calculations. Look a token up
   with `hearth tokens get` (see the `hearth-cli` skill) before using it.
7. **Space tokens are for spacing only**: never for `width`, `height` or font
   sizes.
8. **No custom styles on typography components** (`Heading`, `BodyText`,
   `DetailText`...): if you want to change font size, weight, family, line
   height or letter spacing, look for another variant or prop first.

## Critical rules

Worked wrong/right examples live in [`references/`](references/). Read the
relevant file **before** writing code, not only when stuck:
`layout-and-style-props.md` for any layout, spacing, style props or responsive
props; `tokens-and-patterns.md` for tokens, `asChild`, icon and illustration
imports and common patterns.

Gotchas (code in `references/tokens-and-patterns.md`):

- Illustrations (spot, scene, mascot) come from
  `@utilitywarehouse/hearth-svg-assets` as a `.svg` import used as an `<img>`
  source, not from `hearth-react-icons`, which exports icon components only.
- Full-width on mobile, auto-width on larger screens is set on the parent
  layout (`alignItems={{ mobile: 'stretch', desktop: 'start' }}`), not on
  `Button`.

- **Layout components, not margins.** Structure with `Box`, `Flex`, `Grid`,
  `Container`. Space children with `gap` on the parent; align with
  `justifyContent`/`alignItems`. Never put `margin` on sibling UI elements or
  add a wrapper `Box` just for positioning.
- **Fixed Figma widths.** Check whether a pixel width lines up with a grid
  span: if so use `Grid` + `gridColumnSpan`, not a hardcoded `maxWidth`.
  Reserve `maxWidth` for genuine, non-grid constraints.
- **Predefined `spacing`.** If the design specifies a `spacing` value
  (`layout/spacing/*` or `layout/content/spacing-*`), use the `spacing` prop,
  not responsive `gap`. If unspecified, use `gap`; if unsure, ask. See
  `figma-implementation` for the mechanical check.
- **Typography component = Figma font-family**, not available sizes:
  `typography/heading/font-family` → `Heading`, `…/body-text/…` → `BodyText`,
  `…/detail-text/…` → `DetailText`. `DetailText` having larger sizes than
  `Heading` does not make it right for a heading-font element. Semantic
  typography components that don't exist in Figma (e.g. `Strong`, `Em`) are
  listed in the typography docs; check before creating one.
- **Style props first, valid tokens only.** `padding="200"`, not `"3"`, `3`
  or `style={{ padding: '16px' }}`.
- **Responsive objects always include `mobile`.** Breakpoints
  (`mobile`/`tablet`/`desktop`/`wide`) are mobile-first; values don't cascade
  down, so `{ tablet: 'column' }` applies nothing at mobile.
- **`asChild` to change the rendered element** without breaking semantics
  (`<Button asChild><NextLink/></Button>`, never a `<button>` wrapping an
  `<a>`); `as="span"` on `Box`/`Flex`/`Grid` inside text.
- **Compound components**: read the component's docs before composing
  (`Card`→`CardContent`/`CardActions`, `Modal`→`ModalRoot`/`ModalTrigger`/
  `ModalContent`/`ModalFooter`/`ModalClose`, `Accordion`→`AccordionItem`/
  `AccordionTrigger`/`AccordionContent`).
- **Accessibility is not optional.** Always set `as` on `Heading`; add `title`
  - `titleId` to standalone (non-decorative) icons; use a `null` alt on purely
    decorative images; don't undermine the ARIA wiring Hearth provides.
