---
name: hearth-react-native
description: MANDATORY before editing files importing `@utilitywarehouse/hearth-react-native` or `-icons`, adapting Figma `get_design_context` output, or delegating Hearth props research to a subagent. Never use node_modules types or grep instead.
---

# Building with Hearth React Native

You are a React Native engineer turning Figma designs or written requirements
into UI using Hearth, Utility Warehouse's design system.

## Load this skill before

This is a hard gate, not a vague prompt to get around to eventually. Load it
**before**:

- writing or editing any file that imports `@utilitywarehouse/hearth-react-native`
  or `@utilitywarehouse/hearth-react-native-icons`;
- adapting Figma `get_design_context` output into code. Load
  `figma-implementation` alongside this skill (it covers the Figma-to-code
  verification workflow; this skill covers the component API). Loading
  `figma-design-to-code` does not satisfy this skill;
- delegating research about a Hearth component's props, variants or usage to a
  subagent. Reading `node_modules` types or grepping existing usage is NOT a
  substitute for the component docs below; load this skill or pass its
  instructions into the subagent's prompt.

Packages: components `@utilitywarehouse/hearth-react-native`, icons
`@utilitywarehouse/hearth-react-native-icons`.

## Discover before you implement

The library is broad: check whether an existing component covers the need
before building anything custom, and before bare React Native primitives.

**Default to the `hearth-react-native` MCP server** (its own instructions
explain `docs-list`, `docs-show`, `docs-show-story`). For a component, fetch
both its `stories-<component>` entry (props + story code) and its
`components-<component>--docs` entry (narrative usage, accessibility).
Subcomponents (e.g. `ModalImage`, `CardAction`) have their own
`stories-<subcomponent>` entries: fetch those directly; their narrative usage
is inline in the parent's `--docs` entry.

If the MCP is unavailable, or you need a story's exact code, use the raw
markdown in the installed package. Resolve its root first (it is usually
hoisted in a monorepo):

```sh
node -e "const path = require('path'); console.log(path.dirname(require.resolve('@utilitywarehouse/hearth-react-native/package.json')))"
```

Then read `<root>/public/llms.txt` (index), `<root>/public/llms/components/`
(one file per component) and `<root>/public/llms/docs/` (tokens, styling,
layout, hooks, dark mode).

When reusing a local pattern for a Hearth component, still check the
component's own doc page: the library may have added a more direct prop since
(e.g. `List`'s `heading`/`helperText` vs a sibling `SectionHeader`). Prefer
the documented, current shorthand over an older local convention.

## Plan before writing

For anything beyond a trivial change (new screen, multi-component feature,
unfamiliar code), share a brief plan first: the Hearth components and why, any
local components, the file structure, and decisions with several reasonable
options. Small self-contained tasks can proceed directly.

## Principles

1. **Use Hearth React Native** for all UI unless told otherwise.
2. **Use available components first**, not bare React Native primitives.
3. **Compose, don't reinvent**: layout components plus utility props; custom
   components or Unistyles styles only when absolutely necessary.
4. **Built-in variants and utility props before custom Unistyles**
   (`variant="outline"`, `size="sm"`, `p="200"`, `rounded="lg"`).
5. **Semantic colours.** `color`, `iconColor`, `backgroundColor` (`bg`/`bgColor`)
   resolve against semantic tokens (`color="primary"`, `bg="brand"`); don't use
   raw palette values (`theme.color.purple[400]`) unless no semantic token fits.
6. **Theme tokens in Unistyles `StyleSheet.create`**, not hardcoded hex codes or
   font sizes. A hardcoded pixel dimension is fine when the theme has no
   matching token: check first.
7. **Space tokens are for spacing only**, not one-off dimensions.

## Critical rules

Worked examples live in [`references/`](references/): read
`layout-and-typography.md` for layout, spacing and the Figma text-style
mapping, `styling-and-platform.md` for Unistyles, breakpoints, providers and
safe area, and `patterns.md` for gotchas and common patterns.

### Figma-to-code fidelity (mechanical checks, not judgment calls)

- **Respect `hidden` flags.** A hidden node is not part of the default state:
  don't render it unconditionally. To reuse hidden content for another state,
  say so in a code comment and confirm with the user.
- **Don't invent style variants.** If a text node's colour variable isn't
  visible, use the base/primary token, not a muted/secondary colour.
- **Verify each component instance individually** against its own region of
  the screenshot (variant props like `Flex`/`DescriptionList` `direction` are
  not exposed by `get_metadata`; the screenshot is the only ground truth).
- **Typography = Figma text style name**, mapped to component + `size`
  (+ `weight`), never sized by eye. Mapping table in
  `references/layout-and-typography.md`.

### Layout and spacing

- Use layout components (`Box`, `Flex`, `Grid`, `Center`, `Container`);
  space children with `gap` or `spacing` on the parent, align with
  `justify`/`align`. Never add margin to sibling UI elements.
- `Container` is the default wrapper for a screen's top-level scrollable
  content. If any Figma variable path bound to a node contains `container`,
  use `Container`'s padding/margin props, not a bare `Flex`/`Box`.
- `gap` (raw space token `'0'..'900'`, not responsive) and `spacing` (semantic
  `'2xs'..'2xl'`, responsive; `space` is a deprecated alias) are not
  interchangeable. See `figma-implementation` for the mapping check.

### Styling

- Custom styles use Unistyles `StyleSheet.create(theme => ...)` from the
  package, never `StyleSheet` from `react-native`. Use variants +
  `styles.useVariants` and `compoundVariants`, not conditionals in the body;
  `_web` blocks for web-only pseudo-classes.
- Hearth breakpoints are `base`, `xs`, `sm`, `md`, `lg`, `xl`, `superLarge`,
  `tvLike` (not `mobile`/`tablet`/`desktop`/`wide`). **Never omit `base`** in a
  responsive object, or nothing applies at the smallest size.

### App setup and platform

- Wrap the app root in `GestureHandlerRootView` and Hearth's
  `BottomSheetModalProvider` (needed by `BottomSheet`, `Modal`, `Select`,
  `Combobox`, `Menu`, `DatePicker`, `TimePicker`, swipeable `Toast`). If a
  sheet fails to present or the app crashes, check these first.
- Bottom-sheet components read `useSafeAreaInsets` from
  `BottomSheetModalProvider` (set it `false` there, not on the component, and
  only if the screen handles insets); `NavModal` reads insets from the
  Unistyles runtime. Don't add your own `SafeAreaView` around Hearth components.

### Accessibility

Not optional. Use React Native accessibility props (`accessibilityRole`,
`accessibilityLabel`, `accessibilityHint`, `accessibilityState`), not ARIA, and
don't override what Hearth wires. Don't hand-roll labels/hints for inputs
inside `FormField`. Details in `references/patterns.md`.

### Compound components

Read a component's docs before composing sub-components (`Card`, `Accordion`,
`FormField`...); they share state via `<Component>Context`, so don't prop-drill.
Interactive rows (`ListItem` with `onPress`, `CardAction`) render their own
trailing chevron: don't add it yourself (`references/patterns.md`).
