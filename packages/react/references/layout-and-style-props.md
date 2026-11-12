# Layout, style props and responsive props

Source of truth: `public/llms/docs/layout.md`, `public/llms/docs/responsive-design/breakpoints.md`.

## Layout primitives

| Component   | Use for                                                                                                                            |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `Box`       | Generic block container; supports all style props; spacing, sizing, colour, flex/grid child behaviour, show/hide responsively etc. |
| `Flex`      | Flexbox layouts — rows, columns, centring, wrapping                                                                                |
| `Grid`      | Grid layouts — columns and rows                                                                                                    |
| `Container` | Page-width container with responsive gutters and vertical spacing                                                                  |

```tsx
<Flex direction="column" gap={{ mobile: '200', desktop: '400' }}>
  <Heading>Title</Heading>
  <BodyText>Content</BodyText>
</Flex>

<Grid defaultResponsiveColumns gap="200">
  <Box gridColumnSpan={{ mobile: '4', tablet: '4', desktop: '6' }}>...</Box>
  <Box gridColumnSpan={{ mobile: '4', tablet: '4', desktop: '6' }}>...</Box>
</Grid>

<Box display={{ mobile: 'none', tablet: 'block' }}>Desktop only</Box>

<Container spacing="xl">...</Container>
```

`defaultResponsiveColumns` sets 4 columns on mobile, 8 on tablet, 12 on
desktop+wide. `gridColumnSpan` takes a string from `'1'` to `'12'`.

## Spacing: gap, not margin

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

## Fixed pixel widths from Figma: `gridColumnSpan` vs `maxWidth`

A fixed Figma width (e.g. `680px`) is not automatically a `maxWidth`. If it
lines up with a span of the grid's column tracks, express it as `Grid` with
`gridColumnSpan`:

```tsx
// ❌ WRONG — hardcoded width that happens to match a grid span
<Box maxWidth="680px">{...}</Box>

// ✅ CORRECT
<Grid defaultResponsiveColumns>
  <Box gridColumnSpan={{ mobile: '4', tablet: '8', desktop: '8' }}>{...}</Box>
</Grid>
```

Reserve `maxWidth` for a genuine constraint that isn't grid-derived (e.g.
readable text width).

## Predefined `spacing` vs `gap`

When a Figma design specifies a `spacing` value, use the built-in `spacing`
prop, not responsive `gap`. If spacing isn't specified by the design or user,
use `gap`; if unsure, ask. Figma exposes the value as `layout/spacing/*`
(`Flex`/`Grid`/`Card`) or `layout/content/spacing-*` (`Container`); both map
to the same `spacing` scale (`none`/`2xs`/`xs`/`sm`/`md`/`lg`/`xl`/`2xl`).
The `figma-implementation` skill has the mechanical check.

## Style props

```tsx
// ✅ CORRECT
<Box padding="200" />
<Flex gap="300" />
<Box backgroundColor="primary" />

// ❌ WRONG — "3" is not a token (it is "300")
<Flex gap="3" />
// ❌ WRONG — numeric values are not valid
<Flex gap={3} />
// ❌ WRONG — raw px values bypass the token system
<Box style={{ padding: '16px' }} />
```

Token strings map to CSS custom properties: `"200"` → `var(--h-space-200)`.

## Responsive props

Breakpoints (`mobile` | `tablet` | `desktop` | `wide`) are mobile-first: a
value applies from that breakpoint upward until overridden.

```tsx
<Box padding={{ mobile: '100', desktop: '200' }} />  // tablet inherits mobile

<Flex
  direction={{ mobile: 'column', tablet: 'row' }}
  gap={{ mobile: '200', desktop: '400' }}
>

// ❌ WRONG — no style applied at mobile
<Flex direction={{ tablet: 'column' }} />
// ✅ CORRECT
<Flex direction={{ mobile: 'row', tablet: 'column' }} />
```
