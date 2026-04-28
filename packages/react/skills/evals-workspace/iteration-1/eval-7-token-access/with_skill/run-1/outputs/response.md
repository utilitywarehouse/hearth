# Accessing Hearth Design Tokens Outside Hearth Components

There are two distinct scenarios here, and each has the correct tool for the job.

---

## Scenario 1: Background colour on a custom `div` (not a Hearth component)

The right approach is **CSS custom properties in a `.css` file**. Hearth's stylesheet registers all token values as CSS custom properties globally — they are always in scope once the hearth-react stylesheet is imported. You do not need any JavaScript import.

```css
/* myComponent.css */
.myCard {
  background-color: var(--h-color-brand-purple-50);
  border-radius: var(--h-border-radius-md);
}
```

```tsx
// MyCard.tsx
import styles from './myComponent.css';

export function MyCard() {
  return (
    <div className={styles.myCard}>
      Content here
    </div>
  );
}
```

### Token naming convention

CSS custom properties follow the pattern:

- Colours: `var(--h-color-<token-name>)` — e.g. `var(--h-color-brand-purple-500)`, `var(--h-color-grey-100)`
- Spacing: `var(--h-spacing-<value>)` — e.g. `var(--h-spacing-200)` (equivalent to token `200`)
- Border radius: `var(--h-border-radius-<size>)` — e.g. `var(--h-border-radius-md)`

This is the preferred approach over JavaScript imports for anything that can live in CSS, because it keeps styling in the stylesheet layer where it belongs and gets full browser optimisation.

---

## Scenario 2: Token value as padding in a React inline style (third-party chart component)

When you need a token value **in JavaScript** — for example, to pass it as a prop or inline style to a third-party component that does not accept CSS class names — import from `hearth-tokens/browser`.

**Critical: use the `/browser` subpath, not the root import.**

```tsx
// CORRECT
import { space, color } from '@utilitywarehouse/hearth-tokens/browser';

function MyChart() {
  return (
    <ThirdPartyChart
      style={{ padding: space[200] }}
    />
  );
}
```

```tsx
// WRONG — root import is for Node.js / build-time use only, not browser runtime
import { space } from '@utilitywarehouse/hearth-tokens';
```

### Why the `/browser` subpath matters

The root `hearth-tokens` export is intended for build tooling and Node.js contexts. The `/browser` subpath exports resolved values that are safe to use at runtime in the browser. Using the wrong import path can cause your token values to be undefined or behave unexpectedly.

### Available token objects from `hearth-tokens/browser`

```tsx
import { space, color } from '@utilitywarehouse/hearth-tokens/browser';

// space tokens — keyed by the token number as a string or number
space[200]   // e.g. '16px'
space[300]   // e.g. '24px'
space[400]   // e.g. '32px'

// color tokens
color['brand-purple-500']
color['grey-100']
```

### Practical example with a chart library

```tsx
import { space, color } from '@utilitywarehouse/hearth-tokens/browser';
import { BarChart } from 'some-chart-library';

export function RevenueChart() {
  return (
    <BarChart
      style={{
        padding: space[300],
        backgroundColor: color['brand-purple-50'],
      }}
      margin={{ top: space[100], right: space[200] }}
    />
  );
}
```

---

## Summary: Token access order of preference

| Situation | Approach |
|---|---|
| Hearth `Box`, `Flex`, `Grid` components | Style props — `<Box padding="200" backgroundColor="brand-purple-50" />` |
| Custom HTML elements or CSS Modules | CSS custom properties — `var(--h-spacing-200)`, `var(--h-color-brand-purple-50)` |
| Inline styles or third-party component props (JS) | `import { space, color } from '@utilitywarehouse/hearth-tokens/browser'` |

Always reach for the highest option in the list that fits your constraint. Style props are the most ergonomic and least error-prone. CSS variables are the right middle ground for custom elements. The JS import from `hearth-tokens/browser` is specifically for cases where you have no choice but to pass a value through JavaScript — such as third-party components that only accept inline styles or numeric values.
