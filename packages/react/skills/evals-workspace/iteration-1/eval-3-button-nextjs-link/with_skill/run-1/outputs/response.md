# Using hearth-react Button with Next.js Routing

To create a button that navigates to `/dashboard` using Next.js routing with a solid highlight appearance, use the `Button` component's `asChild` prop combined with Next.js's `Link` component.

## The Pattern: `asChild`

The `Button` component supports an `asChild` prop, which uses the Radix UI "slot" pattern. When `asChild` is set, `Button` passes all its visual styles and behaviour to its child element — in this case, Next.js's `<Link>`. The result is a fully styled `Button` that navigates via the Next.js router.

## Correct Variant and ColorScheme

For a "solid highlight" button, the correct props are:

- `variant="solid"`
- `colorScheme="highlight"`

**Important:** The `Button` component uses discriminated unions for `variant` and `colorScheme`. The `highlight` colorScheme is **only** valid with `emphasis` or `solid` variants. Using it with `outline` or `ghost` will produce a TypeScript error and render without colour.

```tsx
// WRONG — TypeScript error and renders colourless
<Button variant="outline" colorScheme="highlight" />

// CORRECT
<Button variant="solid" colorScheme="highlight" />
```

## Full Code Example

```tsx
import Link from 'next/link';
import { Button } from '@utilitywarehouse/hearth-react';

export function DashboardButton() {
  return (
    <Button asChild variant="solid" colorScheme="highlight">
      <Link href="/dashboard">Go to Dashboard</Link>
    </Button>
  );
}
```

The `Button` component renders the Next.js `<Link>` as the underlying element, so the navigation is handled by Next.js (client-side routing, prefetching, etc.) while the button receives all the Hearth visual styles.

## What Not to Do

Do **not** wrap a `<Button>` inside an `<a>` tag or Next.js `<Link>` without `asChild` — this produces invalid HTML (a button nested inside an anchor, or vice versa):

```tsx
// WRONG — invalid HTML nesting
<Link href="/dashboard">
  <Button variant="solid" colorScheme="highlight">Go to Dashboard</Button>
</Link>

// WRONG — same problem in reverse
<button>
  <a href="/dashboard">Go to Dashboard</a>
</button>
```

Use `asChild` to delegate rendering to the child element, as shown above.

## Additional Notes

- `asChild` is **not** supported with the `emphasis` variant — only use it with `solid`, `outline`, or `ghost`.
- The `size` prop accepts responsive values: `'sm' | 'md'`, e.g. `size={{ base: 'sm', md: 'md' }}`.
- If the button appears on a dark background (UW Purple or Dark Purple), add the `inverted` prop.
- Disabled state should use `aria-disabled` (the component stays keyboard-focusable).

## Complete Setup Reminder

Make sure your app root has the required providers and styles imported:

```tsx
// In your root layout or _app
import '@utilitywarehouse/hearth-fonts';
import '@utilitywarehouse/hearth-react/styles.css';
import { HearthProvider } from '@utilitywarehouse/hearth-react';

function App({ children }) {
  return <HearthProvider>{children}</HearthProvider>;
}
```
