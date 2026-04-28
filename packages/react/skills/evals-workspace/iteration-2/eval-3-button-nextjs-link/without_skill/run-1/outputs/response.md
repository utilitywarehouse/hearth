# Button with Next.js Routing in hearth-react

To create a solid highlight button that navigates to `/dashboard` using Next.js routing, use the `asChild` prop on the `Button` component combined with Next.js's `Link` component.

## Next.js v13+ (recommended)

```tsx
import NextLink from 'next/link';
import { Button } from '@utilitywarehouse/hearth-react';

<Button asChild variant="solid" colorScheme="highlight">
  <NextLink href="/dashboard">Go to Dashboard</NextLink>
</Button>
```

The `asChild` prop tells the `Button` to render its child element (the Next.js `Link`) as the underlying DOM element, merging the button's styles and behaviour onto it. This means you get the visual appearance of a solid highlight button while Next.js handles the client-side routing.

## How it works

- `variant="solid"` — gives the button a solid filled appearance (the default variant)
- `colorScheme="highlight"` — applies the highlight colour scheme (the primary action colour)
- `asChild` — instead of rendering a `<button>` element, the component clones its child (`<NextLink>`) and passes it all the button's props and styles

## Notes

- **`emphasis` variant incompatibility**: The `asChild` prop cannot currently be used with `variant="emphasis"`. Use `variant="solid"` instead, which also supports the `highlight` colour scheme.
- **Next.js before v13**: In older versions of Next.js, `Link` required an `<a>` child. Use `passHref` and nest an `<a>` inside:

```tsx
import NextLink from 'next/link';
import { Button } from '@utilitywarehouse/hearth-react';

<NextLink href="/dashboard" passHref>
  <Button asChild variant="solid" colorScheme="highlight">
    <a href="/dashboard">Go to Dashboard</a>
  </Button>
</NextLink>
```

- The `Button` renders with `aria-disabled` (not the native `disabled` attribute) when disabled, keeping it keyboard-focusable. If your navigation button has a disabled state, this behaviour is preserved.
