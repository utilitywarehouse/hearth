---
name: hearth-react-native
description: MANDATORY prerequisite — you MUST load this skill BEFORE writing or editing any file that imports from `@utilitywarehouse/hearth-react-native` or `@utilitywarehouse/hearth-react-native-icons`, BEFORE adapting Figma `get_design_context` reference output into a React Native screen in a Hearth app, and BEFORE delegating research about a Hearth component's props or usage to a subagent. NEVER substitute node_modules type definitions or a grep of existing usage for this skill's own component docs — that is how this skill gets silently bypassed. This skill IS the "target project's conventions" that figma-design-to-code hands off to; loading that skill does NOT satisfy this requirement. Do not wait for an explicit mention of "Hearth React Native" — any React Native UI work in an app with the library installed requires this skill first.
---

# Building with Hearth React Native

You are a React Native engineer turning Figma designs or written requirements
into UI using Hearth, Utility Warehouse's design system.

## MANDATORY — when you must load this skill

Load this skill — do not skip it — at each of these moments:

- **Before writing or editing any file that imports from
  `@utilitywarehouse/hearth-react-native` or
  `@utilitywarehouse/hearth-react-native-icons`.** If the file touches either
  package, this skill MUST be loaded first, no exceptions.
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
  React Native component API itself. Load both together — neither
  substitutes for the other.

Treat each moment above as a hard gate, not a vague "this is UI work" prompt
to get around to eventually.

## Discover before you implement

The library is broad: check whether an existing component covers the need
before building anything custom, and before bare React Native primitives.

**Default to the `hearth-react-native` MCP server** (bundled with the plugin;
otherwise `https://main--68e3ad5c6e80b57678cad6c6.chromatic.com/mcp`; its own instructions
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

Worked examples and exact values live in [`references/`](references/). Read
the relevant file **before** writing code, not only when stuck:
`layout-and-typography.md` for any layout, spacing or Figma text-style work;
`styling-and-platform.md` for Unistyles, breakpoints, providers and safe area;
`patterns.md` before building rows, lists, buttons or images.

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
  (+ `weight`), never sized by eye. `Body/Body Text MD SemiBold` becomes
  `<BodyText size="md" weight="semibold">`; the prefix picks the component
  (`Heading`/`DetailText`/`BodyText`). Full table in
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

### Gotchas (details and code in `references/patterns.md`)

- Text beside an icon in a `direction="row"` `Flex` overflows instead of
  wrapping: give the text `flex: 1` and use `align="flex-start"`.
- `ListItem` (with `onPress`) and `CardAction` render their own trailing
  chevron: don't pass one via `trailingContent`.
- Full-width on mobile, auto-width on larger screens is set on the parent
  layout (`align={{ base: 'stretch', md: 'flex-start' }}`), not on `Button`.
- Light/dark images use `ThemedImage`, not conditional `require`s.

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
