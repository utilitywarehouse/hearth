---
name: hearth-react-native
description: MANDATORY prerequisite — you MUST load this skill BEFORE writing or editing any file that imports from `@utilitywarehouse/hearth-react-native` or `@utilitywarehouse/hearth-react-native-icons`, BEFORE adapting Figma `get_design_context` reference output into a React Native screen in a Hearth app, and BEFORE delegating research about a Hearth component's props or usage to a subagent. NEVER substitute node_modules type definitions or a grep of existing usage for this skill's own component docs — that is how this skill gets silently bypassed. This skill IS the "target project's conventions" that figma-design-to-code hands off to; loading that skill does NOT satisfy this requirement. Do not wait for an explicit mention of "Hearth React Native" — any React Native UI work in an app with the library installed requires this skill first.
---

# Building with Hearth React Native

You are acting as a React Native engineer. Your job is to turn requirements —
either Figma designs or written requirements — into UI React Native code using
Hearth — Utility Warehouse's Design Systems libraries.

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
  docs (see "Before you implement" below). Spawning a research subagent to
  answer a question this skill already answers is how this skill gets
  silently bypassed — load this skill, or pass its instructions into the
  subagent's prompt, before delegating.

Treat each moment above as a hard gate, not a vague "this is UI work" prompt
to get around to eventually.

## Package imports

| Purpose    | Package                                       |
| ---------- | ---------------------------------------------- |
| Components | `@utilitywarehouse/hearth-react-native`       |
| Icons      | `@utilitywarehouse/hearth-react-native-icons` |

## Before you implement: discover what exists

There are 2 options for discovering existing components and documentation:

- MCP server: `hearth-react-native` MCP hosted on a remote URL
- Raw markdown files: located in the `public` folder of the `hearth-react-native` package

**Default to the raw markdown files.** They are local, always available, and
version-matched to what the app actually has installed — so the API you read is
the API you get.

**Use the MCP server for richer exploration** — searching across components,
fetching story code, or discovering what exists when you're not sure where to
start. It's worth reaching for when the markdown files don't give you enough
context, but it requires the server to be configured and reachable.

Whatever source you use, review what is available before writing any code.

The library is broad — always check whether an existing component covers the
need before implementing anything custom.

### Raw markdown files

Full component API reference is available in the installed package. First,
resolve where it is installed — in a monorepo the package is typically hoisted
to the repo root rather than the app's local `node_modules`:

node -e "const path = require('path'); console.log(path.dirname(require.resolve('@utilitywarehouse/hearth-react-native/package.json')))"

The docs are then at:

- `<hearth-react-native-root>/public/llms/components/` — one file per component
- `<hearth-react-native-root>/public/llms/docs/` — design tokens, styling, layout, hooks, dark mode
- `<hearth-react-native-root>/public/llms.txt` — index of all available docs

### MCP Server

You can use the **`hearth-react-native`** MCP server if available (`https://main--68e3ad5c6e80b57678cad6c6.chromatic.com/mcp`):

1. `list-all-documentation` — get an index of all Hearth React Native components
2. `get-documentation` — get props, API, and usage examples for a specific component
3. `get-documentation-for-story` — get story code and docs for a specific story

## Plan before writing

For anything beyond a trivial change — a new screen, a multi-component feature, an
unfamiliar part of the codebase — share a brief plan before writing code:

- Which Hearth components you'll use and why
- Any local components you'll need
- The output folder/file structure
- Any decisions where multiple reasonable options exist

For small, self-contained tasks (adding a button, tweaking a layout) you can
proceed directly. Use your judgement: if you'd want sign-off as a developer
pairing with someone, ask for it here too.

---

# Principles

1. **Use Hearth React Native.** (`@utilitywarehouse/hearth-react-native`) This is
   the default component library for Utility Warehouse React Native apps. Use it
   for all UI work unless explicitly told otherwise.
2. **Use available components first.** Check documentation for what is available
   before writing custom UI, or reaching for bare React Native primitives.
3. **Compose, don't reinvent.** Most screens can be built by composing existing
   layout and UI components and utilising utility props. Only create new
   components or custom Unistyles styles when absolutely necessary.
4. **Use built-in variants and utility props, before custom Unistyles.**
   `variant="outline"`, `size="sm"`, `p="200"`, `rounded="lg"` — only reach for a
   custom `StyleSheet.create` when these don't achieve the desired result.
5. **Use semantic colors.** The `color`, `iconColor`, `backgroundColor` (and `bg`/
   `bgColor` shorthands) utility props resolve against simplified semantic tokens
   (e.g. `color="primary"`, `bg="brand"`) — don't reach for raw palette values
   (`theme.color.purple[400]`) unless a semantic token doesn't cover the case.
6. **Theme tokens in Unistyles `StyleSheet.create`, not hardcoded values.** Any
   custom styling should pull from the `theme` argument (`theme.space`,
   `theme.color`, `theme.font`, `theme.borderRadius`) rather than hardcoded hex
   codes or font sizes. Prefer tokens for pixel dimensions too, but a hardcoded
   value (e.g. a `minHeight` with no matching token) is fine when no token
   covers the case — check the theme first rather than treating this as an
   absolute rule.
7. **Space tokens are for spacing only** — do not use spacing tokens for
   one-off dimensions that aren't part of the spacing scale.

# Critical Rules

## Use layout components

(Source of truth: [`public/llms/docs/layout-components.md`](public/llms/docs/layout-components.md))

Use layout components to structure and space content. Do not add margin to
individual UI elements to achieve spacing — keep spacing decisions at the layout
level so UI components stay composable.

Five layout primitives, all built on design tokens:

| Component   | Use for                                                                                            |
| ----------- | --------------------------------------------------------------------------------------------------- |
| `Box`       | Generic container (renders a `View`); supports all utility props — spacing, sizing, colour, flex/position etc. |
| `Flex`      | Flexbox layouts — rows, columns, centring, wrapping                                                 |
| `Grid`      | Grid layouts — responsive column counts                                                             |
| `Center`    | `Box` pre-configured with `alignItems="center"` and `justifyContent="center"`                       |
| `Container` | Page-width container with responsive gutters and vertical spacing                                   |

```tsx
// Box with utility props (shorthand + full names both work)
<Box bg="brand" p="200" borderRadius="md">
  <BodyText color="inverted">Content</BodyText>
</Box>

// Flex column with gap
<Flex direction="column" gap="200">
  <Heading>Title</Heading>
  <BodyText>Content</BodyText>
</Flex>

// Responsive grid columns
<Grid columns={{ base: 1, md: 2, lg: 3 }} spacing="md">
  <Box>{...}</Box>
  <Box>{...}</Box>
</Grid>

// Centered content
<Center>
  <Spinner />
</Center>
```

Use `gap` (or the `spacing`/`space` alias) on the parent `Flex`/`Grid` to space
children. For distribution and alignment, use `justify`/`align` on `Flex`. Don't
put margin on individual sibling components just for spacing.

```tsx
// ❌ WRONG — margin for spacing
<Flex>
  <Button mr="100">Cancel</Button>
  <Button>Submit</Button>
</Flex>

// ✅ CORRECT — gap on parent
<Flex gap="100">
  <Button>Cancel</Button>
  <Button>Submit</Button>
</Flex>
```

`Box` accepts the full set of utility props (shorthand and full names), for
example: `p`/`padding`, `px`/`paddingHorizontal`, `m`/`margin`, `h`/`height`,
`w`/`width`, `bg`/`backgroundColor`, `rounded`/`borderRadius`, plus every other
`ViewStyle` property directly (`flex`, `alignItems`, `position`, `opacity`,
etc.). `Flex` and `Grid` accept the same spacing/sizing/colour utility props
alongside their own layout-specific props (`direction`, `align`, `justify`,
`wrap` on `Flex`; `columns` on `Grid`).

## Styling: Unistyles, not `StyleSheet` from `react-native`

(Source of truth: [`public/llms/docs/styling.md`](public/llms/docs/styling.md))

Custom styles use `react-native-unistyles`'s `StyleSheet.create(theme => ({...}))`,
re-exported from the package. Only reach for this when utility props and
existing component variants don't cover the need.

- Define styles as **variants** (e.g. `size`, `colorScheme`, `variant`,
  `disabled`) and apply them at render time via `styles.useVariants({...})`.
- Use **`compoundVariants`** for combinations that need distinct treatment,
  rather than conditional logic in the component body.
- Read colours, spacing, radii, and typography from the `theme` parameter
  (`theme.color.*`, `theme.space[...]`, `theme.borderRadius.*`, `theme.font.*`)
  rather than hardcoding a hex value or font family. Prefer a token for pixel
  dimensions too, but check the theme first before assuming one doesn't
  exist — existing components do fall back to a hardcoded value (e.g. a
  `minHeight`) when there's genuinely no matching token.
- `_web` blocks hold web-only pseudo-class styles (`_hover`, `_focus-visible`,
  `_active`) since Unistyles targets both native and `react-native-web`
  (Storybook renders through `react-native-web`, so these matter for how a
  component looks there).

```tsx
const ButtonRoot = ({ variant = 'solid', size = 'md', disabled = false, ...props }) => {
  styles.useVariants({ variant, size, disabled });

  return <Pressable {...props} style={styles.container} />;
};

const styles = StyleSheet.create(theme => ({
  container: {
    borderRadius: theme.components.button.borderRadius,
    gap: theme.components.button.gap,
    _web: {
      '_focus-visible': {
        outlineStyle: 'solid',
        outlineWidth: 2,
        outlineColor: theme.color.focus.primary,
      },
    },
    variants: {
      disabled: {
        true: { opacity: theme.opacity.disabled },
      },
      variant: {
        solid: { borderColor: theme.color.interactive.highlight.border.strong },
        outline: { backgroundColor: 'transparent', borderWidth: 2 },
      },
      size: {
        sm: { minHeight: 32 },
        md: { minHeight: 48 },
      },
    },
    compoundVariants: [
      {
        variant: 'solid',
        size: 'sm',
        styles: { paddingHorizontal: theme.space['150'] },
      },
    ],
  },
}));
```

## Responsive breakpoints

(Source of truth: [`public/llms/docs/styling.md`](public/llms/docs/styling.md#responsive-design-with-breakpoints))

Breakpoints are configured once (via Unistyles' `StyleSheet.configure`) and
cascade **mobile-first**: a value applies from that breakpoint upward until
overridden by a larger one. See the
[Unistyles breakpoints reference](https://www.unistyl.es/v3/references/breakpoints/)
for the underlying behaviour.

Hearth's breakpoints are `base`, `xs`, `sm`, `md`, `lg`, `xl`, `superLarge`,
`tvLike` — **not** the web package's `mobile`/`tablet`/`desktop`/`wide` names.
`base` is the required starting point (must map to the smallest screen size)
and behaves like `mobile` does on web: never omit it from a responsive object,
or nothing applies at the smallest breakpoint.

```tsx
const styles = StyleSheet.create(theme => ({
  container: {
    // ❌ WRONG — no style applied below `md`
    padding: { md: theme.space['400'] },

    // ✅ CORRECT
    padding: { base: theme.space['200'], md: theme.space['400'] },
  },
}));
```

`Grid`'s `columns` prop takes the same breakpoint keys directly:
`columns={{ base: 1, md: 2, lg: 3 }}`.

## Required app-level providers

(Source of truth: [`public/llms/docs/getting-started.md`](public/llms/docs/getting-started.md))

Hearth React Native components rely on these wrapping the app root:

- `GestureHandlerRootView` (from `react-native-gesture-handler`) — required for
  any gesture-driven component (`BottomSheet`, `Modal`, `Select`, swipeable
  `Toast`, etc.).
- `BottomSheetModalProvider` (from Hearth) — required for any component built on
  a bottom sheet (`Modal`, `Combobox`, `Select`, `Menu`, `DatePicker`,
  `TimePicker`).

```tsx
import { BottomSheetModalProvider } from '@utilitywarehouse/hearth-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => (
  <GestureHandlerRootView>
    <BottomSheetModalProvider>{/* app content */}</BottomSheetModalProvider>
  </GestureHandlerRootView>
);
```

If a screen renders one of these components and the app crashes or the sheet
fails to present, check these providers are wired up before debugging further.

## Safe area handling

Two different patterns exist depending on the component — check which one
applies before reaching for `react-native-safe-area-context` directly:

- **Bottom-sheet-based components** (`Modal`, `Combobox`, `Select`, and the
  `BottomSheet*` primitives) don't take their own safe-area prop — they read a
  boolean `useSafeAreaInsets` (default `true`) from the nearest
  `BottomSheetModalProvider` via context, which toggles whether their internal
  `SafeAreaView` applies the `top` edge. Set `useSafeAreaInsets={false}` on
  `BottomSheetModalProvider` only if the parent screen already handles
  safe-area insets itself — don't look for the prop on the individual
  components. (Source of truth:
  [`public/llms/components/modal.md`](public/llms/components/modal.md))
- **`NavModal`** (used when a screen is already presented by React Navigation)
  reads safe-area insets directly from the Unistyles runtime
  (`rt.insets.top`/`rt.insets.bottom` inside `StyleSheet.create((theme, rt) =>
  ...)`) rather than rendering a `SafeAreaView`. (Source of truth:
  [`public/llms/components/nav-modal.md`](public/llms/components/nav-modal.md))

Don't wrap Hearth components in your own `SafeAreaView` on top of these —
check `BottomSheetModalProvider`'s `useSafeAreaInsets` prop (or `NavModal`'s
own prop, for that component) first.

## Accessibility

Accessibility is not optional — the UW product is used by customers across a
wide range of abilities, and assistive technology support is a product
requirement. Use React Native's accessibility props, not ARIA/web semantics:

- `accessibilityRole`, `accessibilityLabel`, `accessibilityHint`,
  `accessibilityState` — Hearth wires these where it can (e.g. `Heading`
  always sets `accessibilityRole="header"`), so in most cases you just need to
  use the components correctly and avoid overriding what they do.
- For form inputs wrapped in `FormField`, don't hand-roll
  `accessibilityLabel`/`accessibilityHint` — `FormField` and its inputs
  already combine the label, helper text, and required/invalid state into the
  correct accessibility props via the `useFormFieldAccessibility` hook.
- Use `accessibilityState={{ checked, disabled }}` (not custom props) on
  toggle-like components so screen readers report state correctly.

## Compound components

Many components have sub-components that must be used together. Read the
reference file before composing. Examples:

- `Card` → `CardContent`, `CardActions`, `CardAction*`, `CardPressHandler`
- `Accordion` → `AccordionItem`, `AccordionTrigger`, `AccordionHeader`,
  `AccordionContent`
- `FormField` → `FormFieldLabel`, `FormFieldHelper`, `FormFieldValid`,
  `FormFieldInvalid`

Compound components share state via a `<Component>Context` (check for a
`useXContext` export) rather than prop drilling.

## Common patterns

### Themed images that adapt to light/dark mode

(Source of truth: [`public/llms/docs/dark-mode-best-practice.md`](public/llms/docs/dark-mode-best-practice.md))

```tsx
<ThemedImage light={require('./logo-light.png')} dark={require('./logo-dark.png')} />
```

### Full-width button on mobile, auto-width on larger screens

Control width with the parent layout component rather than a prop on `Button`.

```tsx
<Flex direction="column" align={{ base: 'stretch', md: 'flex-start' }}>
  <Button variant="solid" colorScheme="highlight">
    Submit
  </Button>
</Flex>
```
