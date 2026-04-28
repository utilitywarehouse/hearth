## Setting up hearth-react in a Next.js App Router root layout

For a Next.js App Router project, everything hearth-react needs at the application level goes into `app/layout.tsx`. Here is the complete setup:

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

### What each line does

**The imports:**

- `HearthProvider` — the context provider that hearth-react components (such as Tooltip) depend on. It must wrap your entire application tree.
- `'@utilitywarehouse/hearth-fonts'` — loads the UW brand typefaces. This is a side-effect import with no named exports.
- `'@utilitywarehouse/hearth-react/styles.css'` — the hearth-react component stylesheet, which also injects all the CSS custom properties (design tokens) that style props and CSS variables rely on.

**Provider placement:**

`HearthProvider` wraps `{children}` inside `<body>`. This means every page and layout nested under the root layout has access to hearth-react's component context. Do not place it inside a specific page or a nested layout — it needs to be at the root so nothing is outside its scope.

### Optional: CSS breakpoints for your own CSS files

If your team also wants to use hearth-react's named media queries (e.g. `@media (--h-tablet)`) in your own `.css` files, you need a PostCSS setup. Install the required packages:

```bash
pnpm add -D postcss-custom-media @csstools/postcss-global-data autoprefixer
```

Then create `postcss.config.js` at the project root:

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

After that, you can use the named breakpoints in any CSS file:

```css
.myComponent { padding: var(--h-spacing-200); }
@media (--h-tablet) { .myComponent { padding: var(--h-spacing-300); } }
@media (--h-desktop) { .myComponent { padding: var(--h-spacing-400); } }
```

Note: the PostCSS step is only needed for your own CSS files. hearth-react components themselves and style props (like `<Box padding="200">`) work without it.
