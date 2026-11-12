# Tokens, `asChild` and common patterns

## Package imports

`hearth-react-icons` exports React components:
`import { AddMediumIcon } from '@utilitywarehouse/hearth-react-icons'`.
`hearth-svg-assets` exports raw `.svg` files via subpath import, used as an
image source, not a component:
`import Scene from '@utilitywarehouse/hearth-svg-assets/lib/scene-broadband-light.svg'`,
then `<img src={Scene} alt="..." />`. Spot/scene/mascot illustrations come from
`hearth-svg-assets`, not `hearth-react-icons`.

## Browser tokens in JS/TS, CSS variables in CSS

Check the token exists in `@utilitywarehouse/hearth-tokens/browser` before
using it.

```tsx
// ✅ CORRECT
import { semantic, border, space } from '@utilitywarehouse/hearth-tokens/browser';

const CardHighlightHeader = styled(Box)({
  backgroundColor: semantic.surface.highlight.subtle,
  borderBottom: `${border.width[2]} solid ${semantic.border.strong}`,
  padding: space[200],
});

// ❌ WRONG — CSS variables in JS/TS
const CardHighlightHeader = styled(Box)({
  backgroundColor: 'var(--h-surface-highlight-subtle)',
  padding: 'var(--h-space-200)',
});
```

In `.css` files, custom properties are always in scope from the `hearth-react`
stylesheet (no import needed):

```css
.myComponent {
  padding: var(--h-spacing-200);
  color: var(--h-color-brand-purple-500);
  border-radius: var(--h-border-radius-md);
}
```

## `asChild`

`asChild` clones the child and forwards props/behaviour onto it (Radix Slot).

```tsx
// ✅ CORRECT — one <a> element
<Button asChild variant="solid" colorScheme="highlight">
  <NextLink href="/next-page">Continue</NextLink>
</Button>

// ❌ WRONG — <button> wrapping <a>, invalid HTML
<Button variant="solid" colorScheme="highlight">
  <NextLink href="/next-page">Continue</NextLink>
</Button>
```

`Box`, `Flex`, `Grid` default to `div`; use `as="span"` inside a paragraph:

```tsx
// ❌ WRONG — div inside a paragraph
<BodyText>Click <Box className="highlight">here</Box></BodyText>
// ✅ CORRECT
<BodyText>Click <Box as="span" className="highlight">here</Box></BodyText>
```

To apply style props to an element without them, without an extra DOM node:

```tsx
<Box asChild padding="300">
  <section>...</section>
</Box>
```

## Common patterns

Full-width button on mobile, auto-width on desktop (control width via the
parent layout, not `Button`):

```tsx
<Flex direction="column" alignItems={{ mobile: 'stretch', desktop: 'start' }}>
  <Button variant="solid" colorScheme="highlight">Submit</Button>
</Flex>
```

Responsive two-column grid:

```tsx
<Grid defaultResponsiveColumns gap={{ mobile: '200', desktop: '400' }}>
  <Box gridColumnSpan={{ mobile: '4', tablet: '4', desktop: '6' }}><BodyText>One</BodyText></Box>
  <Box gridColumnSpan={{ mobile: '4', tablet: '4', desktop: '6' }}><BodyText>Two</BodyText></Box>
</Grid>
```
