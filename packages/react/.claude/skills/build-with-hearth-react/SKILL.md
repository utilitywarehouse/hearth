---
name: build-with-hearth-react
description: >
  Guide for assembling UI with @utilitywarehouse/hearth-react — layout system, style props,
  responsive props, design tokens, asChild composition, and Next.js integration. Use this
  skill whenever you're building a feature or page with hearth-react: implementing a Figma
  design, creating a layout, applying spacing or responsive behaviour, composing components
  with asChild, or integrating hearth-react into a Next.js App Router project. Also use it
  when asked about the token system, breakpoints, or how to style something with hearth-react.
---

# Build with hearth-react

This skill covers how to correctly compose and style UI using `@utilitywarehouse/hearth-react`.
For individual component APIs and accessibility, see the `hearth-react-component-reference` skill.

## Layout primitives

Four primitives, all built on design tokens:

| Component | Use for |
|---|---|
| `Box` | Spacing, sizing, colour, flex/grid child behaviour, show/hide responsively |
| `Flex` | Flexbox layouts — rows, columns, centring, wrapping |
| `Grid` | Grid layouts — columns and rows |
| `Container` | Page-width container with responsive gutters and vertical spacing |

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

## Style props and space tokens

Style props are the primary way to apply spacing and sizing. They map directly to design
tokens — prefer them over raw CSS values.

**Space tokens** (used for padding, margin, gap, width, height, etc.) — these are **string values**,
not arbitrary numbers:
`'0'` `'25'` `'50'` `'75'` `'100'` `'150'` `'175'` `'200'` `'250'` `'300'` `'350'` `'400'` `'500'` `'600'` `'700'` `'800'` `'900'` `'1000'`

```tsx
// CORRECT
<Box padding="200" />
<Flex gap="300" />
<Box marginBottom="400" />

// WRONG — "3" is not a valid token (the token is "300")
<Flex gap="3" />
// WRONG — numeric values are not valid
<Flex gap={3} />
// WRONG — raw px values bypass the token system
<Box style={{ padding: '16px' }} />
```

Token strings map to CSS custom properties: `"200"` → `var(--h-spacing-200)`.

## Responsive props

Many props accept a `Responsive` object with breakpoint keys. Breakpoints are
**mobile-first**: a value applies from that breakpoint upward until overridden.

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
// WRONG — no style applied at mobile
<Flex direction={{ tablet: 'column' }} />

// CORRECT
<Flex direction={{ mobile: 'row', tablet: 'column' }} />
```

## Spacing and alignment: Flex over margin

Use `gap` on the parent container to space children. For distribution and alignment, use
`justifyContent`/`alignItems` on a Flex wrapper. Don't put `margin` on individual sibling
components or wrap them in an extra `Box` just for positioning.

```tsx
// WRONG — margin for spacing
<Flex>
  <Button marginRight="100">Cancel</Button>
  <Button>Submit</Button>
</Flex>

// CORRECT — gap on parent
<Flex gap="100">
  <Button>Cancel</Button>
  <Button>Submit</Button>
</Flex>
```

```tsx
// WRONG — margin hack for alignment
<Flex>
  <BodyText>Summary</BodyText>
  <Button marginLeft="auto">Edit</Button>
</Flex>

// CORRECT — justifyContent on the Flex wrapper
<Flex justifyContent="space-between" alignItems="center">
  <BodyText>Summary</BodyText>
  <Button variant="ghost" colorScheme="functional">Edit</Button>
</Flex>
```

## asChild — render any element as another

`asChild` clones the child element and forwards all props and behaviour onto it, using the
Radix Slot pattern. Use it to change the underlying HTML element without breaking semantics.

```tsx
// Button that renders as a Next.js Link (correct HTML — one <a> element)
import NextLink from 'next/link';
<Button asChild variant="solid" colorScheme="highlight">
  <NextLink href="/next-page">Continue</NextLink>
</Button>

// Without asChild — WRONG: <button> wrapping <a>, invalid HTML
<Button variant="solid" colorScheme="highlight">
  <NextLink href="/next-page">Continue</NextLink>
</Button>
```

`asChild` is **not supported** on `Button` or `IconButton` with `variant="emphasis"`.

Box, Flex, and Grid default to `div`. If you need a `span` (e.g., inside a paragraph):

```tsx
// WRONG — renders a div inside a paragraph
<BodyText>Click <Box className="highlight">here</Box></BodyText>

// CORRECT
<BodyText>Click <Box as="span" className="highlight">here</Box></BodyText>
```

## Styling: style props, browser tokens, CSS variables

Use in this order of preference:

### 1. Style props (first choice)

The simplest and most common approach. Maps to design tokens automatically.

```tsx
<Box padding="200" backgroundColor="brand-purple-50" />
<Flex gap="300" />
```

### 2. hearth-tokens/browser in React files

When you need token values in JavaScript (e.g., for inline styles or third-party components),
import from `hearth-tokens/browser`, **not** from `hearth-tokens` root.

```tsx
// CORRECT
import { space, color } from '@utilitywarehouse/hearth-tokens/browser';
<ThirdPartyChart style={{ padding: space[200] }} />

// WRONG — root import is for Node/build-time use only
import { space } from '@utilitywarehouse/hearth-tokens';
<Box style={{ padding: space[200] }} />
```

### 3. CSS variables in `.css` files

CSS custom properties are always in scope from the hearth-react stylesheet — no import needed.

```css
.myComponent {
  padding: var(--h-spacing-200);
  color: var(--h-color-brand-purple-500);
  border-radius: var(--h-border-radius-md);
}
```

## Next.js integration

### HearthProvider placement

`HearthProvider` provides component context (Tooltip, etc.). Place it in your root layout:

```tsx
// app/layout.tsx
import { HearthProvider } from '@utilitywarehouse/hearth-react';
import '@utilitywarehouse/hearth-fonts';
import '@utilitywarehouse/hearth-react/styles.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <HearthProvider>{children}</HearthProvider>
      </body>
    </html>
  );
}
```

### CSS breakpoints in Next.js

hearth-react ships `breakpoints.css` with CSS Custom Media definitions. To use
`@media (--h-tablet)` etc. in your app CSS, configure PostCSS:

```bash
pnpm add -D postcss-custom-media @csstools/postcss-global-data autoprefixer
```

```js
// postcss.config.js
module.exports = {
  plugins: {
    '@csstools/postcss-global-data': {
      files: ['./node_modules/@utilitywarehouse/hearth-react/breakpoints.css'],
    },
    'postcss-custom-media': {},
    autoprefixer: {},
  },
};
```

Then use in CSS:

```css
.myComponent { padding: var(--h-spacing-200); }
@media (--h-tablet) { .myComponent { padding: var(--h-spacing-300); } }
@media (--h-desktop) { .myComponent { padding: var(--h-spacing-400); } }
```

## Design-to-code workflow (Figma)

1. Read the design — get component names and spacing values from Figma
2. Match Figma spacing values to hearth-react space tokens (token `200` ≈ 16px, `300` ≈ 24px, `400` ≈ 32px)
3. Use `Flex`/`Grid`/`Box` for layout with `gap` for spacing between children
4. Map Figma components to hearth-react components using the component reference skill
5. Check the `hearth-react-component-reference` skill for any component you're unsure about

## Common patterns

### Full-width button on mobile, auto-width on desktop

```tsx
<Flex direction="column" alignItems={{ mobile: 'stretch', desktop: 'start' }}>
  <Button variant="solid" colorScheme="highlight">Submit</Button>
</Flex>
```

### Card with content and footer

```tsx
<Flex direction="column" gap="400" padding="400">
  <Flex direction="column" gap="200">
    <Heading size="md">Title</Heading>
    <BodyText>Description text here.</BodyText>
  </Flex>
  <Flex gap="100" justifyContent="end">
    <Button variant="ghost" colorScheme="functional">Cancel</Button>
    <Button variant="solid" colorScheme="highlight">Confirm</Button>
  </Flex>
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

`defaultResponsiveColumns` sets 4 columns on mobile, 8 on tablet, 12 on desktop+wide.
`gridColumnSpan` takes a string value from `'1'` to `'12'`.
