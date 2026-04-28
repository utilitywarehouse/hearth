# Setting Up hearth-react in a Next.js App Router Project

Here is a complete walkthrough of what belongs in your root layout, where `HearthProvider` goes, and when you need `'use client'` on a page.

---

## 1. Install the packages

```bash
npm install @utilitywarehouse/hearth-react @utilitywarehouse/hearth-react-icons
# also install the peer-dependency font package
npm install @utilitywarehouse/hearth-fonts
```

---

## 2. What goes in the root layout file

Your root `app/layout.tsx` is a **Server Component** by default in Next.js App Router, and that is where you want it to stay. The layout needs to do two things for hearth-react:

1. Import the global stylesheet (`styles.css`) — this brings in the CSS reset, design tokens, and all component styles.
2. Render `HearthProvider` around your content.

```tsx
// app/layout.tsx
import type { ReactNode } from 'react';
import { HearthProvider } from '@utilitywarehouse/hearth-react';

// Import the hearth-react stylesheet. This includes:
// - the CSS reset (@utilitywarehouse/hearth-css-reset)
// - design tokens (colours, typography, spacing, etc.)
// - all component styles
import '@utilitywarehouse/hearth-react/styles.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <HearthProvider>{children}</HearthProvider>
      </body>
    </html>
  );
}
```

### Why the stylesheet must be in the root layout

`styles.css` sets up CSS custom properties (design tokens) and base resets at the document level. Every hearth-react component depends on these tokens being present. Importing it here ensures they are available everywhere in the tree, on every route, with no duplication.

### A note on fonts

If you are using `@utilitywarehouse/hearth-fonts`, follow that package's own setup instructions — it typically involves adding font-face declarations and setting the correct CSS custom properties (`--h-font-family-body`, `--h-font-family-heading`). The hearth-react CSS reset already references those custom properties, so the fonts just need to be loaded before or alongside `styles.css`.

---

## 3. Where HearthProvider goes

`HearthProvider` wraps your entire application and must be an ancestor of every hearth-react component in your tree. In App Router, the root `app/layout.tsx` is the correct place.

Under the hood, `HearthProvider` renders a `TooltipProvider` (from Radix UI), which provides the shared tooltip delay/skip configuration used by all `Tooltip` components. Because of this, it uses React context, and the file itself has `'use client'` at the top — **but you do not need to add `'use client'` to your layout** because of this. Next.js handles the Server/Client boundary correctly: the layout stays a Server Component; `HearthProvider` (a Client Component) is rendered as a leaf of that server tree, and only the subtree it owns runs on the client.

```tsx
// app/layout.tsx  — stays a Server Component, no 'use client' needed
import '@utilitywarehouse/hearth-react/styles.css';
import { HearthProvider } from '@utilitywarehouse/hearth-react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <HearthProvider>{children}</HearthProvider>
      </body>
    </html>
  );
}
```

If you have other application-level providers (e.g. a query client, auth context, analytics), wrap them together with `HearthProvider` to keep a single provider tree:

```tsx
// app/providers.tsx  — 'use client' needed here because it owns client context
'use client';

import { HearthProvider } from '@utilitywarehouse/hearth-react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/query-client';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <HearthProvider>{children}</HearthProvider>
    </QueryClientProvider>
  );
}
```

```tsx
// app/layout.tsx
import '@utilitywarehouse/hearth-react/styles.css';
import { Providers } from './providers';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

---

## 4. When to add `'use client'` to a page

The short answer is: **add `'use client'` to a page (or a component) when that page/component uses anything that requires the browser environment or React interactivity features that are not available in Server Components.**

The common triggers are:

| Trigger | Examples |
|---|---|
| React state | `useState`, `useReducer` |
| React lifecycle / effects | `useEffect`, `useLayoutEffect` |
| React refs | `useRef`, `createRef` |
| Browser APIs | `window`, `document`, `localStorage`, `navigator` |
| Event handlers | `onClick`, `onChange`, `onSubmit` |
| Third-party hooks that use the above | Most data-fetching hooks, animation libraries, etc. |

### hearth-react components and `'use client'`

Many hearth-react components already include `'use client'` internally. This means that **just rendering one of those components on a Server Component page does not require you to mark the page as a client component** — Next.js treats the hearth-react component itself as the client boundary.

For example, this page is a valid Server Component even though it renders interactive hearth-react components:

```tsx
// app/some-page/page.tsx  — Server Component, no 'use client' needed
import { Badge, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@utilitywarehouse/hearth-react';

export default async function SomePage() {
  const data = await fetchData(); // server-side data fetch

  return (
    <main>
      <Badge colorScheme="success">Active</Badge>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
```

### When you DO need `'use client'` on a page

You need it when your page-level code itself uses interactive features:

```tsx
// app/settings/page.tsx — needs 'use client' because it uses useState and onChange
'use client';

import { useState } from 'react';
import { TextInput, Button } from '@utilitywarehouse/hearth-react';

export default function SettingsPage() {
  const [name, setName] = useState('');

  return (
    <form onSubmit={(e) => { e.preventDefault(); save(name); }}>
      <TextInput
        label="Display name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button type="submit">Save</Button>
    </form>
  );
}
```

### Best practice: push `'use client'` down the tree

Rather than marking an entire page as `'use client'`, extract only the interactive parts into a separate client component. This keeps the page a Server Component and allows server-side data fetching alongside client interactivity:

```tsx
// app/settings/page.tsx — Server Component; fetches data server-side
import { NameForm } from './name-form';

export default async function SettingsPage() {
  const user = await getUser(); // server-side
  return <NameForm initialName={user.name} />;
}
```

```tsx
// app/settings/name-form.tsx — Client Component
'use client';

import { useState } from 'react';
import { TextInput, Button } from '@utilitywarehouse/hearth-react';

export function NameForm({ initialName }: { initialName: string }) {
  const [name, setName] = useState(initialName);
  return (
    <form onSubmit={...}>
      <TextInput label="Display name" value={name} onChange={(e) => setName(e.target.value)} />
      <Button type="submit">Save</Button>
    </form>
  );
}
```

---

## Summary

| Location | Needs `'use client'`? | What to put there |
|---|---|---|
| `app/layout.tsx` | No | `HearthProvider`, CSS import |
| `app/providers.tsx` (if you have multiple providers) | Yes | All client-side context providers |
| `app/some-page/page.tsx` (data-display only) | No | Server-side data fetching + hearth-react components |
| `app/some-page/page.tsx` (with state/events) | Yes | Interactive UI |
| `app/some-page/interactive-part.tsx` | Yes | Extracted interactive child components |
