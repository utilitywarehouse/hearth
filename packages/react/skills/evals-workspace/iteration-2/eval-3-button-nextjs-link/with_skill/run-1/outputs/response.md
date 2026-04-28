# Button navigating to /dashboard with Next.js routing

Use the `Button` component with the `asChild` prop to render it as a Next.js `Link`. The `asChild` prop delegates rendering to the child element, so the button's visual styles are applied to the `<Link>` component instead.

For a "solid highlight" button, use `variant="solid"` and `colorScheme="highlight"`.

```tsx
import Link from 'next/link';
import { Button } from '@utilitywarehouse/hearth-react';

<Button asChild variant="solid" colorScheme="highlight">
  <Link href="/dashboard">Go to dashboard</Link>
</Button>
```

## Key points

- `asChild` — delegates the rendered element to the child (`Link`), merging button styles onto it. This is the correct pattern for rendering a button as a router link.
- `variant="solid"` — use for primary actions in regular UI. This is the correct semantic variant here (not `emphasis`, which is for standalone hero CTAs).
- `colorScheme="highlight"` — required with `variant="solid"`. The `solid` and `emphasis` variants only accept `highlight` as their `colorScheme`. Using any other value (e.g. `functional`) will cause a TypeScript error and render the button without colour.

## What not to do

Do not use `asChild` with `variant="emphasis"` — it is explicitly not supported and will not work correctly.

Do not use a mismatched `colorScheme` such as:

```tsx
// WRONG — TypeScript error and renders colourless
<Button variant="solid" colorScheme="functional">...</Button>
```
