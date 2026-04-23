# Layout

All layout uses Hearth components — never raw `<div>` or `<span>`.

## Box

Generic container with styling props but no flexbox behaviour.

```tsx
import { Box } from '@utilitywarehouse/hearth-react';
```

**Props:**

| Prop | Values | Notes |
|---|---|---|
| `padding` / `paddingX` / `paddingY` / `paddingTop` / `paddingRight` / `paddingBottom` / `paddingLeft` | space tokens | Responsive |
| `margin` / `marginX` / `marginY` / `marginTop` / `marginRight` / `marginBottom` / `marginLeft` | space tokens | Responsive |
| `width` / `height` / `minWidth` / `maxWidth` / `minHeight` / `maxHeight` | CSS values | |
| `backgroundColor` | preset color names | |
| `color` | `'primary'` \| `'secondary'` \| `'brand'` \| `'affirmative'` \| `'inverted'` | |
| `borderRadius` | `'none'` \| `'xs'` \| `'sm'` \| `'md'` \| `'lg'` \| `'xl'` \| `'full'` | |
| `borderWidth` / `borderColor` / `borderStyle` | — | Individual sides also supported |
| `position` | CSS position values | |
| `top` / `right` / `bottom` / `left` | CSS values | |
| `display` | `'block'` \| `'none'` \| `'inline-block'` \| `'inline'` | Responsive |
| `overflow` / `overflowX` / `overflowY` | CSS values | |
| `as` | HTML element string | Renders as that element |
| `asChild` | boolean | Slot pattern — merges props onto single child |

**Examples:**

```tsx
// Responsive padding
<Box padding={{ mobile: '400', desktop: '800' }}>
  content
</Box>

// Responsive show/hide
<Box display={{ mobile: 'none', tablet: 'block' }}>
  Only visible tablet and above
</Box>

// Bordered container
<Box borderWidth="1" borderColor="var(--h-color-purple-800)" borderRadius="md" padding="400">
  bordered content
</Box>
```

---

## Flex

Flexbox container. Inherits all Box props plus flex-specific ones.

```tsx
import { Flex } from '@utilitywarehouse/hearth-react';
```

**Additional props:**

| Prop | Values | Notes |
|---|---|---|
| `direction` | `'row'` \| `'column'` \| `'row-reverse'` \| `'column-reverse'` | Responsive |
| `gap` | space tokens | Responsive |
| `spacing` | `'none'` \| `'2xs'` \| `'xs'` \| `'sm'` \| `'md'` \| `'lg'` \| `'xl'` \| `'2xl'` | Shorthand convenience |
| `alignItems` | `'start'` \| `'center'` \| `'end'` \| `'baseline'` \| `'stretch'` | Responsive |
| `justifyContent` | `'start'` \| `'center'` \| `'end'` \| `'between'` \| `'around'` \| `'evenly'` | Responsive |
| `wrap` | `'nowrap'` \| `'wrap'` \| `'wrap-reverse'` | |

**Examples:**

```tsx
// Responsive layout — column on mobile, row on desktop
<Flex direction={{ mobile: 'column', desktop: 'row' }} gap={{ mobile: '200', desktop: '400' }}>
  <Item />
  <Item />
</Flex>

// Centred content
<Flex alignItems="center" justifyContent="center" padding="600">
  <Spinner />
</Flex>

// Spacing shorthand
<Flex spacing="lg" direction="column">
  <Section />
  <Section />
</Flex>

// As a semantic list (avoids a wrapper div)
<Flex asChild>
  <ul>
    <li><Item /></li>
    <li><Item /></li>
  </ul>
</Flex>
```

**Gotcha:** `spacing` is a convenience shorthand — use `gap` for fine-grained control.

---

## Grid

CSS Grid container with responsive column support.

```tsx
import { Grid } from '@utilitywarehouse/hearth-react';
```

**Key props:**

| Prop | Values | Notes |
|---|---|---|
| `defaultResponsiveColumns` | boolean | Enables the standard 4/8/12-column responsive grid |
| `gap` | space tokens | Responsive |
| `columns` | number or responsive object | Explicit column count |

Child elements can use `gridColumnSpan` to control how many columns they span:

```tsx
<Grid defaultResponsiveColumns gap="300">
  <Alert colorScheme="info" title="Full width alert" gridColumnSpan="full" />
  <Card gridColumnSpan={{ mobile: 'full', tablet: '4', desktop: '3' }}>...</Card>
  <Card gridColumnSpan={{ mobile: 'full', tablet: '4', desktop: '3' }}>...</Card>
</Grid>
```

---

## Container

Centred, max-width wrapper. Use for page-level content.

```tsx
import { Container } from '@utilitywarehouse/hearth-react';
```

Centres content horizontally with appropriate max-width and horizontal padding. Inherits Box props.

```tsx
<Container>
  <Heading as="h1" size="xl">Page title</Heading>
  <BodyText size="md">Page content</BodyText>
</Container>
```

---

## Center

Centres its children both horizontally and vertically.

```tsx
import { Center } from '@utilitywarehouse/hearth-react';

<Center minHeight="400px">
  <Spinner />
</Center>
```

---

## Responsive patterns

All layout props accept `{ mobile, tablet, desktop, wide }` — use these instead of CSS media queries:

```tsx
// Show/hide by breakpoint
<Box display={{ mobile: 'none', desktop: 'block' }}>Desktop only</Box>
<Box display={{ mobile: 'block', desktop: 'none' }}>Mobile only</Box>

// Responsive padding
<Container padding={{ mobile: '400', desktop: '800' }}>
  content
</Container>

// Stack on mobile, row on desktop
<Flex
  direction={{ mobile: 'column', tablet: 'row' }}
  gap={{ mobile: '300', tablet: '400' }}
>
  <Panel />
  <Panel />
</Flex>

// Responsive grid
<Grid gap={{ mobile: '200', desktop: '400' }} columns={{ mobile: 1, tablet: 2, desktop: 3 }}>
  {items.map(item => <Card key={item.id}>...</Card>)}
</Grid>
```
