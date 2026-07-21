---
name: hearth-react
description: MANDATORY prerequisite — you MUST load this skill BEFORE writing or editing any file that imports from `@utilitywarehouse/hearth-react` or `@utilitywarehouse/hearth-react-icons`, BEFORE adapting Figma `get_design_context` reference output into a page or component in a Hearth app, and BEFORE delegating research about a Hearth component's props or usage to a subagent. NEVER substitute node_modules type definitions or a grep of existing usage for this skill's own component docs — that is how this skill gets silently bypassed. This skill IS the "target project's conventions" that figma-design-to-code hands off to; loading that skill does NOT satisfy this requirement. Do not wait for an explicit mention of "Hearth React" — any frontend UI work in an app with the library installed requires this skill first.
---

# Building with Hearth React

You are acting as a frontend engineer. Your job is to turn requirements—either
Figma designs or written requirements—into UI React code using Hearth — Utility
Warehouse's Design Systems libraries.

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
  docs (see "Before you implement" below). Spawning a research subagent to
  answer a question this skill already answers is how this skill gets
  silently bypassed — load this skill, or pass its instructions into the
  subagent's prompt, before delegating.

Treat each moment above as a hard gate, not a vague "this is UI work" prompt
to get around to eventually.

## Package imports

| Purpose                | Package                                |
| ---------------------- | -------------------------------------- |
| Components             | `@utilitywarehouse/hearth-react`       |
| Icons                  | `@utilitywarehouse/hearth-react-icons` |
| SVG illustrations      | `@utilitywarehouse/hearth-svg-assets`  |
| Animated illustrations | `@utilitywarehouse/hearth-json-assets` |

## Before you implement: discover what exists

There are 2 options for discovering existing components and documentation:

- MCP server: `hearth-react` MCP hosted on a remote URL
- Raw markdown files: located in the `public` folder of the `hearth-react` package

**Default to the raw markdown files.** They are local, always available, and
version-matched to what the app actually has installed — so the API you read is
the API you get.

**Use the MCP server for richer exploration** — searching across components,
fetching story code, or discovering what exists when you're not sure where to
start. It's worth reaching for when the markdown files don't give you enough
context, but it requires the server to be configured and reachable.

For questions about onboarding, updating to a newer version of this skill, or
configuring the MCP server, see [`public/llms/docs/a-i-tools.md`](public/llms/docs/a-i-tools.md).

Whatever source you use, review what is available before writing any code.

The library is broad — always check whether an existing component covers the
need before implementing anything custom.

### Raw markdown files

Full component API reference is available in the installed package. First,
resolve where it is installed — in a monorepo the package is typically hoisted
to the repo root rather than the app's local `node_modules`:

node -e "const path = require('path'); console.log(path.dirname(require.resolve('@utilitywarehouse/hearth-react/package.json')))"

The docs are then at:

- `<hearth-react-root>/public/llms/components/` — one file per component
- `<hearth-react-root>/public/llms/docs/` — design tokens, layout, responsive design, getting started
- `<hearth-react-root>/public/llms.txt` — index of all available docs

### MCP Server

You can use the **`hearth-react`** MCP server if available:

1. `list-all-documentation` — get an index of all Hearth React components
2. `get-documentation` — get props, API, and usage examples for a specific component
3. `get-documentation-for-story` — get story code and docs for a specific story

## Plan before writing

For anything beyond a trivial change — a new page, a multi-component feature, an
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

1. **Use Hearth React.** (`@utilitywarehouse/hearth-react`) This is the default
   component library for Utility Warehouse web applications. Use it for all UI
   work unless explicitly told otherwise.
2. **Use available components first.** Check documentation for what is available
   before writing custom UI, or using native HTML elements.
3. **Compose, don't reinvent.** Most pages can be built by composing existing
   layout and UI components and utilising style props. Only create new
   components or custom styles when absolutely necessary.
4. **Use built-in variants and style props, before custom styles.**
   `variant="outline"`, `size="sm"`, `padding="200"`, `borderRadius="lg"` — only
   use custom styles if these don't achieve the desired result.
5. **Use semantic colors.** `semantic.background.primary`, `semantic.text.brand`
   — never raw values like `color.energyblue[500]`.
6. **CSS tokens for CSS files, Browser tokens for JS/TS/JSX/TSX files.** Do not
   import and use JS tokens for UI, only if needed for calculations.
7. **Space tokens are for spacing only** — do not use tokens like `200` or `400`
   for `width`, `height`, or font sizes
8. **Typography components should not have custom styles** — use the built-in
   variants and style props to achieve the desired result. If you find yourself
   adding custom styles, particularly related to font size, font weight, font
   family, line height, or letter spacing, to a `Heading`, `BodyText`,
   `DetailText` or other typography component, check if there's a more
   appropriate variant or combination of props that achieves the same result
   without custom styles.

# Critical Rules

## Use layout components

Use layout components to structure and space content. Do not add margin to
individual UI elements to achieve spacing — keep spacing decisions at the layout
level so UI components stay composable.

Four layout primitives, all built on design tokens:

| Component   | Use for                                                                                                                            |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `Box`       | Generic block container; supports all style props; spacing, sizing, colour, flex/grid child behaviour, show/hide responsively etc. |
| `Flex`      | Flexbox layouts — rows, columns, centring, wrapping                                                                                |
| `Grid`      | Grid layouts — columns and rows                                                                                                    |
| `Container` | Page-width container with responsive gutters and vertical spacing                                                                  |

```tsx
// Flex column with responsive gap
<Flex direction="column" gap={{ mobile: '200', desktop: '400' }}>
  <Heading>Title</Heading>
  <BodyText>Content</BodyText>
</Flex>

// Grid with responsive columns
<Grid defaultResponsiveColumns gap="200">
  <Box gridColumnSpan={{ mobile: '4', tablet: '4', desktop: '6' }}>...</Box>
  <Box gridColumnSpan={{ mobile: '4', tablet: '4', desktop: '6' }}>...</Box>
</Grid>

// Box to hide on mobile, show on tablet+
<Box display={{ mobile: 'none', tablet: 'block' }}>Desktop only</Box>

// Page container
<Container spacing="xl">...</Container>
```

Use `gap` on the parent container to space children. For distribution and alignment, use
`justifyContent`/`alignItems` on a Flex wrapper. Don't put `margin` on individual sibling
components or wrap them in an extra `Box` just for positioning.

```tsx
// ❌ WRONG — margin for spacing
<Flex>
  <Button marginRight="100">Cancel</Button>
  <Button>Submit</Button>
</Flex>

// ✅ CORRECT — gap on parent
<Flex gap="100">
  <Button>Cancel</Button>
  <Button>Submit</Button>
</Flex>
```

```tsx
// ❌ WRONG — margin hack for alignment
<Flex>
  <BodyText>Summary</BodyText>
  <Button marginLeft="auto">Edit</Button>
</Flex>

// ✅ CORRECT — justifyContent on the Flex wrapper
<Flex justifyContent="space-between" alignItems="center">
  <BodyText>Summary</BodyText>
  <Button variant="ghost" colorScheme="functional">Edit</Button>
</Flex>
```

## Choosing a typography component

Hearth uses three font families. Match the Figma font-family to the component.
(Source of truth: [`public/llms/docs/typography.md`](public/llms/docs/typography.md))

| Figma font-family token                     | Component    |
| ------------------------------------------- | ------------ |
| `var(--typography/heading/font-family)`     | `Heading`    |
| `var(--typography/body-text/font-family)`   | `BodyText`   |
| `var(--typography/detail-text/font-family)` | `DetailText` |

**When implementing from Figma:** before picking a typography component, check
the font-family on the element. Do not choose based on available size options
alone — `DetailText` has larger size variants than `Heading`, but that doesn't
make it correct for heading-font elements.

There are also a number of semantic typography components available in code that
do not exist in Figma. Check the typography reference files for available
components before creating a new one.

## Use predefined responsive spacing values when specified in design

When layout, padding, or margin are defined in a Figma design using a `spacing`
value, use the built-in `spacing` prop; do not replace it with responsive `gap`
values. If spacing is not explicitly defined in the design, or specified by the
user, use `gap` for spacing between elements; if unsure, check with the user.

## Use style props first

Style props are the primary way to apply styling. In most cases they map
directly to design tokens — prefer them over raw CSS values.

Check the common props documentation and component reference files for available
style props.

```tsx
// ✅ CORRECT
<Box padding="200" />
<Flex gap="300" />
<Box marginBottom="400" />
<Box backgroundColor="primary" />

// ❌ WRONG — "3" is not a valid token (the token is "300")
<Flex gap="3" />
// ❌ WRONG — numeric values are not valid
<Flex gap={3} />
// ❌ WRONG — raw px values bypass the token system
<Box style={{ padding: '16px' }} />
```

Token strings map to CSS custom properties: `"200"` → `var(--h-space-200)`.

## Browser tokens in JS/TS, CSS variables in CSS

When using token values from hearth-tokens, only use browser tokens in
JavaScript/JSX/TypeScript/TSX code, including when using styled components. CSS
variables should only be used in CSS. When using browser tokens, always check
the token exists in the `@utilitywarehouse/hearth-tokens/browser` package before
using it.

```tsx
// ✅ CORRECT
import { semantic, border, space } from '@utilitywarehouse/hearth-tokens/browser';

const CardHighlightHeader = styled(Box)({
  backgroundColor: semantic.surface.highlight.subtle,
  borderBottom: `${border.width[2]} solid ${semantic.border.strong}`,
  padding: space[200],
});

// ❌ WRONG — Don't use CSS variables in JS/JSX/TS/TSX code, use browser tokens instead
const CardHighlightHeader = styled(Box)({
  backgroundColor: 'var(--h-surface-highlight-subtle)',
  borderBottom: '2px solid var(--h-border-strong)',
  padding: 'var(--h-space-200)',
});
```

## CSS variables in `.css` files

CSS custom properties are always in scope from the `hearth-react` stylesheet —
no import needed.

```css
.myComponent {
  padding: var(--h-spacing-200);
  color: var(--h-color-brand-purple-500);
  border-radius: var(--h-border-radius-md);
}
```

## Responsive props

Many props accept a `Responsive` object with breakpoint keys. Breakpoints are
**mobile-first**: a value applies from that breakpoint upward until overridden.
(Source of truth: [`public/llms/docs/responsive-design/breakpoints.md`](public/llms/docs/responsive-design/breakpoints.md))

Breakpoints: `mobile` | `tablet` | `desktop` | `wide`

```tsx
// All four breakpoints
<Box padding={{ mobile: '100', tablet: '200', desktop: '300', wide: '400' }} />

// Only specify breakpoints that change — mobile-first means smaller values cascade up
<Box padding={{ mobile: '100', desktop: '200' }} />  // tablet inherits mobile value

// Responsive direction and gap
<Flex
  direction={{ mobile: 'column', tablet: 'row' }}
  gap={{ mobile: '200', desktop: '400' }}
>
```

**Never omit `mobile`** when using a responsive prop object — values don't cascade down
from larger breakpoints. An object without `mobile` applies nothing at mobile size.

```tsx
// ❌ WRONG — no style applied at mobile
<Flex direction={{ tablet: 'column' }} />

// ✅ CORRECT
<Flex direction={{ mobile: 'row', tablet: 'column' }} />
```

## Use asChild to change the underlying HTML element without breaking semantics

`asChild` clones the child element and forwards all props and behaviour onto it, using the
Radix Slot pattern. Use it to change the underlying HTML element without breaking semantics.

```tsx
// ✅ CORRECT - Button that renders as a Next.js Link (correct HTML — one <a> element)
import NextLink from 'next/link';
<Button asChild variant="solid" colorScheme="highlight">
  <NextLink href="/next-page">Continue</NextLink>
</Button>

// ❌ WRONG — Without asChild — <button> wrapping <a>, invalid HTML
<Button variant="solid" colorScheme="highlight">
  <NextLink href="/next-page">Continue</NextLink>
</Button>
```

Box, Flex, and Grid default to `div`. If you need a `span` (e.g., inside a paragraph):

```tsx
// ❌ WRONG — renders a div inside a paragraph
<BodyText>Click <Box className="highlight">here</Box></BodyText>

// ✅ CORRECT
<BodyText>Click <Box as="span" className="highlight">here</Box></BodyText>
```

To apply style props to an element that doesn't natively support them, use `Box`
& `asChild`. This avoids adding an extra DOM node.

```tsx
<Box asChild padding="300">
  <section>...</section>
</Box>
```

You can also use this pattern to apply styles to Hearth React and custom
components.

## Compound components

Many components have sub-components that must be used together. Read the
reference file before composing. Examples:

- `Card` → `CardContent`, `CardActions`, `CardActionLink`
- `Modal` → `ModalRoot`, `ModalTrigger`, `ModalContent`, `ModalFooter`, `ModalClose`
- `Accordion` → `AccordionItem`, `AccordionTrigger`, `AccordionContent`

### Accessibility

Accessibility is not optional — the UW product is used by customers across a
wide range of abilities, and assistive technology support is a product
requirement. Hearth wires ARIA where it can, so in most cases you just need to
use the components correctly and avoid undermining what they do. Concretely:

- Always set `as` on `Heading` for correct semantic hierarchy
- Add `title` + `titleId` to standalone icons, not decorative ones
- Use `asChild` to avoid wrapper elements when a specific HTML element is needed
- Use a `null` alt tag on images that are purely decorative

## Common patterns

### Full-width button on mobile, auto-width on desktop

Control `Button` width with parent layout components.

```tsx
<Flex direction="column" alignItems={{ mobile: 'stretch', desktop: 'start' }}>
  <Button variant="solid" colorScheme="highlight">
    Submit
  </Button>
</Flex>
```

### Responsive two-column grid

```tsx
<Grid defaultResponsiveColumns gap={{ mobile: '200', desktop: '400' }}>
  <Box gridColumnSpan={{ mobile: '4', tablet: '4', desktop: '6' }}>
    <BodyText>Column one</BodyText>
  </Box>
  <Box gridColumnSpan={{ mobile: '4', tablet: '4', desktop: '6' }}>
    <BodyText>Column two</BodyText>
  </Box>
</Grid>
```

`defaultResponsiveColumns` sets 4 columns on mobile, 8 on tablet, 12 on desktop+wide (source: [`public/llms/docs/layout.md`](public/llms/docs/layout.md)).
`gridColumnSpan` takes a string value from `'1'` to `'12'`.
