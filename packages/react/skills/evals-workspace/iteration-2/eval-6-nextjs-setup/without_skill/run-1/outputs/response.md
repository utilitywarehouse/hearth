# Setting Up hearth-react in a Next.js App Router Project

Here is a complete walkthrough of the root layout file and where `HearthProvider` belongs.

## 1. Install the packages

You need three packages to get started:

```console
pnpm add @utilitywarehouse/hearth-react @utilitywarehouse/hearth-react-icons @utilitywarehouse/hearth-fonts
```

## 2. The root layout file

In Next.js App Router projects the root layout lives at `app/layout.tsx`. This is where all the global setup for hearth-react goes.

```tsx
// app/layout.tsx
import '@utilitywarehouse/hearth-fonts';
import '@utilitywarehouse/hearth-react/styles.css';

import { HearthProvider } from '@utilitywarehouse/hearth-react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="root">
          <HearthProvider>{children}</HearthProvider>
        </div>
      </body>
    </html>
  );
}
```

Here is what each part does and why it goes here:

### CSS imports

```tsx
import '@utilitywarehouse/hearth-fonts';
import '@utilitywarehouse/hearth-react/styles.css';
```

These must be imported once at the root of your application. `hearth-react/styles.css` includes the CSS reset and all Hearth design tokens as CSS custom properties — you do not need to install those separately. The fonts package loads the UW typefaces.

### HearthProvider

`HearthProvider` wraps your application to enable all necessary context providers for Hearth components. It should be placed at the root of your application.

`HearthProvider` currently sets up:
- `TooltipProvider` — required for the `Tooltip` component to work correctly.

**Important for Next.js App Router:** `HearthProvider` has a `'use client'` directive at the top of its source file. In App Router, Server Components cannot directly render Client Components that use context/hooks. Because `HearthProvider` is already marked `'use client'` internally, you can import and use it directly in your Server Component layout — Next.js will handle the boundary automatically. You do not need to create a separate wrapper file just for `HearthProvider`.

### The `.root` div and portal stacking

The `<div className="root">` wrapper around your children is recommended when using components that render portals, such as `Modal`. Add this CSS to your global stylesheet:

```css
/* app/globals.css or equivalent */
.root {
  isolation: isolate;
}
```

This creates a separate stacking context so that portalled components (modals, menus, tooltips) always appear above page content, and `z-index` values in your own styles will not interfere with them.

## 3. Optional: ToastProvider

If your application uses the `Toast` component, `ToastProvider` is not included in `HearthProvider` and must be added separately. Add it in your root layout alongside `HearthProvider`:

```tsx
import { HearthProvider, ToastProvider } from '@utilitywarehouse/hearth-react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="root">
          <HearthProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </HearthProvider>
        </div>
      </body>
    </html>
  );
}
```

## 4. Optional: Breakpoints with PostCSS

If you want to use Hearth's CSS custom media queries (e.g. `@media (--h-tablet)`) in your own stylesheets, install the PostCSS plugins and create `postcss.config.js` in your Next.js project root:

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

Then import the breakpoints once in your global stylesheet:

```css
@import '@utilitywarehouse/hearth-react/breakpoints.css';
```

This keeps your responsive behaviour consistent with Hearth's own breakpoint definitions.

## Summary

| What | Where |
|------|-------|
| `import '@utilitywarehouse/hearth-fonts'` | `app/layout.tsx` (top of file) |
| `import '@utilitywarehouse/hearth-react/styles.css'` | `app/layout.tsx` (top of file) |
| `<HearthProvider>` | `app/layout.tsx`, wrapping `{children}` inside `<body>` |
| `<div className="root">` + `isolation: isolate` CSS | Recommended wrapper around `HearthProvider` for portal stacking |
| `<ToastProvider>` | Inside `HearthProvider` if you use `Toast` |
