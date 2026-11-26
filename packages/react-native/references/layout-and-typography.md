# Layout, typography and Figma mapping

Source of truth: `public/llms/docs/layout-components.md`.

## Typography: Figma text style → component

`get_design_context` lists the style name verbatim in "styles contained in the
design", as `<Category>/<Style Name> <SIZE>[ <Weight>]`.

| Figma text style              | Component + props                        |
| ----------------------------- | ---------------------------------------- |
| `Headings/Heading MD`         | `<Heading size="md">`                    |
| `Detail/Detail Text 3XL`      | `<DetailText size="3xl">`                |
| `Body/Body Text MD`           | `<BodyText size="md">`                   |
| `Body/Body Text MD SemiBold`  | `<BodyText size="md" weight="semibold">` |

The prefix names the component (`Heading`/`DetailText`/`BodyText`), the last
token is the lowercased `size`, and a trailing weight modifier (`SemiBold`,
`Bold`) maps to `BodyText`'s lowercased `weight`. This is a mechanical lookup:
use it instead of guessing a size from the screenshot.

## Layout primitives

| Component   | Use for                                                                                                        |
| ----------- | -------------------------------------------------------------------------------------------------------------- |
| `Box`       | Generic container (renders a `View`); all utility props — spacing, sizing, colour, flex/position etc.           |
| `Flex`      | Flexbox layouts — rows, columns, centring, wrapping                                                            |
| `Grid`      | Grid layouts — responsive column counts                                                                        |
| `Center`    | `Box` pre-configured with `alignItems="center"` and `justifyContent="center"`                                   |
| `Container` | Page-width container with responsive gutters and vertical spacing                                              |

```tsx
<Box bg="brand" p="200" borderRadius="md">
  <BodyText color="inverted">Content</BodyText>
</Box>

<Flex direction="column" gap="200">...</Flex>

<Grid columns={{ base: 1, md: 2, lg: 3 }} spacing="md">...</Grid>

<Center><Spinner /></Center>

// Screen top-level scrollable wrapper
<Container>
  <Flex direction="column" spacing="2xl">{...}</Flex>
</Container>
```

`Container` auto-applies the responsive page margin/padding tokens (mobile:
16px horizontal margin, 24px top, 32px bottom, scaling up) that `Box`/`Flex`
have no shortcut for. Before picking a layout prop/component for any node,
scan its bound Figma variable paths: if one contains the segment `container`
(e.g. `layout/container/padding-top`), use `Container`'s own padding/margin
props (or the nearest container-aware ancestor), not a bare `Flex`/`Box`,
whether or not the node is the screen root.

`Flex`/`Grid` spacing props are not aliases:

- **`gap`**: a raw numeric space token (`'0'..'900'`), non-responsive.
- **`spacing`** (alias `space`, deprecated): the semantic layout scale
  (`'2xs'..'2xl'`), automatically responsive (`"2xl"` = 28px mobile, 40px
  desktop).

`figma-implementation` has the mechanical check mapping a Figma variable path
(e.g. `layout/spacing/lg`) to `spacing` vs `gap`.

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

`Box` takes shorthand and full names: `p`/`padding`, `px`/`paddingHorizontal`,
`m`/`margin`, `h`/`height`, `w`/`width`, `bg`/`backgroundColor`,
`rounded`/`borderRadius`, plus any `ViewStyle` property. `Flex` and `Grid`
take the same utility props plus `direction`, `align`, `justify`, `wrap`
(`Flex`) and `columns` (`Grid`).
