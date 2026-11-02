---
name: hearth-react
description: MANDATORY before editing files importing `@utilitywarehouse/hearth-react` or `hearth-react-icons`, adapting Figma `get_design_context` output, or delegating Hearth props research to a subagent. Never use node_modules types or grep instead.
---

# Building with Hearth React

You are a frontend engineer turning Figma designs or written requirements into
React UI using Hearth, Utility Warehouse's design system.

## Load this skill before

This is a hard gate, not a vague prompt to get around to eventually. Load it
**before**:

- writing or editing any file that imports `@utilitywarehouse/hearth-react` or
  `@utilitywarehouse/hearth-react-icons`;
- adapting Figma `get_design_context` output into code. Load
  `figma-implementation` alongside this skill (it covers the Figma-to-code
  verification workflow; this skill covers the component API). Loading
  `figma-design-to-code` does not satisfy this skill;
- delegating research about a Hearth component's props, variants or usage to a
  subagent. Reading `node_modules` types or grepping existing usage is NOT a
  substitute for the component docs below; load this skill or pass its
  instructions into the subagent's prompt.

## Discover before you implement

The library is broad: check whether an existing component covers the need
before building anything custom.

**Default to the `hearth-react` MCP server** (its own instructions explain
`docs-list`, `docs-show`, `docs-show-story`). For a component, fetch both its
plain entry (props + story code) and its `<id>--docs` entry (narrative usage,
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
   variables in JS; use JS tokens for UI only for calculations. Check a browser
   token exists in `@utilitywarehouse/hearth-tokens/browser` before using it.
7. **Space tokens are for spacing only**: never for `width`, `height` or font
   sizes.
8. **No custom styles on typography components** (`Heading`, `BodyText`,
   `DetailText`...): if you want to change font size, weight, family, line
   height or letter spacing, look for another variant or prop first.

## Critical rules

Worked wrong/right examples live in [`references/`](references/): read
`layout-and-style-props.md` for layout, spacing, style props and responsive
props, and `tokens-and-patterns.md` for tokens, `asChild`, icons/illustrations
imports and common patterns.

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
