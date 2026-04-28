# Setting up hearth-react in a Next.js App Router project

Here's a complete walkthrough of what goes in your root layout, where `HearthProvider` lives, and when you need `'use client'`.

---

## 1. The root layout file (`app/layout.tsx`)

Your root layout does three things for hearth-react:

1. Imports the hearth fonts package
2. Imports the hearth-react global stylesheet
3. Wraps `{children}` in `HearthProvider`

```tsx
// app/layout.tsx
import { HearthProvider } from '@utilitywarehouse/hearth-react';
import '@utilitywarehouse/hearth-fonts';
import '@utilitywarehouse/hearth-react/styles.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <HearthProvider>{children}</HearthProvider>
      </body>
    </html>
  );
}
```

**Key points:**

- `@utilitywarehouse/hearth-fonts` — loads the UW brand typefaces. Import it once here; it applies globally.
- `@utilitywarehouse/hearth-react/styles.css` — the component stylesheet and CSS custom properties (spacing, colours, border-radius, etc.). These CSS variables are what power all style props throughout the app.
- `HearthProvider` wraps `{children}` inside `<body>`, not at the `<html>` level. Everything in the app inherits from it.
- The root layout itself does **not** need `'use client'` — it's a Server Component by default, which is correct.

---

## 2. Where HearthProvider goes

`HearthProvider` must be in the root layout so it wraps the entire component tree. This ensures:

- All hearth-react components have the context they need
- The CSS variables from the stylesheet are available everywhere
- Fonts are loaded once for the whole app

Do **not** place `HearthProvider` inside individual pages or feature layouts — one instance at the root is all you need.

---

## 3. When to add `'use client'` to a page

hearth-react components include `'use client'` internally, so the components themselves are already client-safe. The question is whether **your file** needs the directive.

### You need `'use client'` when your file...

- Attaches event handlers (`onClick`, `onChange`, `onSubmit`, etc.)
- Uses React hooks (`useState`, `useEffect`, `useRef`, `useCallback`, etc.)
- Uses browser APIs directly

```tsx
// WRONG — onClick makes this file need 'use client', but the directive is missing
import { Button } from '@utilitywarehouse/hearth-react';

export default function Page() {
  return (
    <Button onClick={() => alert('clicked')}>Click me</Button>
  );
}
```

```tsx
// CORRECT
'use client';
import { Button } from '@utilitywarehouse/hearth-react';

export default function Page() {
  return (
    <Button onClick={() => alert('clicked')}>Click me</Button>
  );
}
```

### You do NOT need `'use client'` when...

Your page is purely static — it renders hearth-react components with no event handlers and no hooks:

```tsx
// No 'use client' needed — static Server Component
import { Heading, BodyText, Flex } from '@utilitywarehouse/hearth-react';

export default function AboutPage() {
  return (
    <Flex direction="column" gap="300">
      <Heading>About us</Heading>
      <BodyText>We are a utility company.</BodyText>
    </Flex>
  );
}
```

This works because hearth-react components declare `'use client'` inside the library itself. Your Server Component can import and render them as long as it doesn't pass event handlers or use hooks.

### Recommended pattern: keep interactive logic in a separate Client Component

Rather than making an entire page a Client Component, extract only the interactive parts:

```tsx
// app/dashboard/page.tsx — Server Component, no 'use client'
import { Flex, Heading } from '@utilitywarehouse/hearth-react';
import { SubmitButton } from './SubmitButton';

export default function DashboardPage() {
  return (
    <Flex direction="column" gap="400">
      <Heading>Dashboard</Heading>
      <SubmitButton />
    </Flex>
  );
}
```

```tsx
// app/dashboard/SubmitButton.tsx — Client Component
'use client';
import { useState } from 'react';
import { Button } from '@utilitywarehouse/hearth-react';

export function SubmitButton() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Button
      variant="solid"
      colorScheme="highlight"
      onClick={() => setSubmitted(true)}
    >
      {submitted ? 'Done!' : 'Submit'}
    </Button>
  );
}
```

This keeps the page as a Server Component (better for data fetching and SEO) while isolating interactivity where it's needed.

---

## 4. Link + Button composition in Next.js

When you need a hearth-react `Button` to navigate, use `asChild` with Next.js `Link`. This produces a single `<a>` element — correct HTML, no nesting issues.

```tsx
'use client';
import NextLink from 'next/link';
import { Button } from '@utilitywarehouse/hearth-react';

export function NavButton() {
  return (
    <Button asChild variant="solid" colorScheme="highlight">
      <NextLink href="/dashboard">Go to dashboard</NextLink>
    </Button>
  );
}
```

Without `asChild`, you'd get a `<button>` wrapping an `<a>` — invalid HTML.

---

## 5. Optional: CSS breakpoints in your own stylesheets

If you want to use hearth-react's named media queries (`--h-tablet`, `--h-desktop`, etc.) in your own `.css` files, install the PostCSS plugins and add this config:

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

Then in your CSS:

```css
.myCard {
  padding: var(--h-spacing-200);
}

@media (--h-tablet) {
  .myCard {
    padding: var(--h-spacing-300);
  }
}

@media (--h-desktop) {
  .myCard {
    padding: var(--h-spacing-400);
  }
}
```

---

## Quick reference

| Scenario | Needs `'use client'`? |
|---|---|
| Root layout with `HearthProvider` | No |
| Static page with hearth-react components | No |
| Page with `onClick`, `onChange`, or any event handler | Yes |
| Page using `useState`, `useEffect`, or any hook | Yes |
| Component using `useRouter` or `usePathname` | Yes |
| Server Component importing a Client Component | No (only the leaf needs it) |
