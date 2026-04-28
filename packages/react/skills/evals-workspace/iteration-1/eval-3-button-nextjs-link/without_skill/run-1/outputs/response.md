# Using a Button as a Next.js Link in hearth-react

To render a `Button` component that navigates to `/dashboard` using Next.js routing while looking like a solid highlight button, you use the `asChild` prop combined with Next.js's `Link` component.

## The `asChild` Prop

The `Button` component supports an `asChild` prop. When set to `true`, the button does not render a native `<button>` element — instead it clones its child element (e.g. a Next.js `Link`) and merges all the button's props and styles onto it. This is based on the [Radix UI composition pattern](https://www.radix-ui.com/primitives/docs/guides/composition).

## For Next.js v13 and later (recommended)

Since Next.js v13, the `Link` component no longer requires an `<a>` child. You can compose it directly:

```tsx
import NextLink from 'next/link';
import { Button } from '@utilitywarehouse/hearth-react';

export function DashboardButton() {
  return (
    <Button asChild variant="solid" colorScheme="highlight">
      <NextLink href="/dashboard">Go to Dashboard</NextLink>
    </Button>
  );
}
```

This renders a Next.js `Link` that looks and behaves exactly like a `solid` / `highlight` `Button`.

## Props explained

- `asChild` — delegates rendering to the child element (`NextLink`), merging all button styles and behaviour onto it.
- `variant="solid"` — gives it the solid visual style. Valid options are `"emphasis"`, `"solid"`, `"outline"`, and `"ghost"`.
- `colorScheme="highlight"` — applies the highlight colour scheme. For `solid` buttons, valid colour schemes are `"highlight"`, `"affirmative"`, and `"destructive"`.

> **Note:** The `highlight` colour scheme is only available on `emphasis` and `solid` variants. Using it with `outline` or `ghost` will result in a TypeScript error and produce a button with no colours.

## For Next.js before v13

If you are on an older version of Next.js, you need to pass `passHref` to `Link` and use an `<a>` as the child:

```tsx
import NextLink from 'next/link';
import { Button } from '@utilitywarehouse/hearth-react';

export function DashboardButton() {
  return (
    <NextLink href="/dashboard" passHref>
      <Button asChild variant="solid" colorScheme="highlight">
        <a>Go to Dashboard</a>
      </Button>
    </NextLink>
  );
}
```

## Caveats

- You **cannot** currently use `asChild` with the `emphasis` variant. Use `solid` with `colorScheme="highlight"` as an alternative for a high-emphasis highlighted button.
- All standard `Button` props (`size`, `disabled`, `loading`, etc.) still work alongside `asChild`.

## Full example with size

```tsx
import NextLink from 'next/link';
import { Button } from '@utilitywarehouse/hearth-react';

export function DashboardButton() {
  return (
    <Button asChild variant="solid" colorScheme="highlight" size="md">
      <NextLink href="/dashboard">Go to Dashboard</NextLink>
    </Button>
  );
}
```
