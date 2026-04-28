# Accessing Hearth Design Tokens

There are two situations here with different correct approaches.

---

## Case 1: Custom div background colour — use a CSS custom property string

All Hearth tokens are defined as CSS custom properties (CSS variables) on `:root`. The naming pattern is:

- Colour primitives: `--h-color-<palette>-<scale>` (e.g. `--h-color-purple-700`)
- Semantic colour tokens: `--h-background-*`, `--h-surface-*`, `--h-text-*`, `--h-feedback-*`, etc.
- Space tokens: `--h-space-<value>` (e.g. `--h-space-200` = 16px)

For a plain `<div>` (or any element that is not a Hearth component), the correct approach is to apply the CSS custom property directly — either through a CSS class or via `style`:

### Option A: CSS class (preferred)

```css
/* your-component.css */
.chart-wrapper {
  background-color: var(--h-surface-brand-default);
}
```

```tsx
import './your-component.css';

function MyComponent() {
  return (
    <div className="chart-wrapper">
      {/* content */}
    </div>
  );
}
```

### Option B: React inline `style`

If you need to apply it inline, reference the CSS variable as a string inside `var()`:

```tsx
function MyComponent() {
  return (
    <div style={{ backgroundColor: 'var(--h-surface-brand-default)' }}>
      {/* content */}
    </div>
  );
}
```

This works because Hearth loads all token definitions into `:root` via `@utilitywarehouse/hearth-react/styles` — as long as you have imported that stylesheet (which happens automatically when you set up `HearthProvider` with the default styles), the CSS variables are available globally to any element in your page, including plain `<div>`s.

**Choosing the right token name**

Prefer semantic tokens over primitive colour values wherever they match your intent:

| Purpose | Token |
|---|---|
| Brand background | `var(--h-surface-brand-default)` |
| Primary page background | `var(--h-background-primary)` |
| Secondary/card background | `var(--h-background-secondary)` |
| Danger surface | `var(--h-feedback-danger-surface-subtle)` |
| A specific raw colour | `var(--h-color-purple-700)` |

---

## Case 2: Padding on a third-party chart component — use `spaceTokens` to build the CSS variable reference, or read the value from the DOM

Third-party components that accept a React `style` prop can receive CSS custom property references directly, just as shown above:

### Option A: Pass `var(--h-space-*)` as a string (simplest)

The space scale maps token names to pixel values:

| Token | Value |
|---|---|
| `--h-space-0` | 0px |
| `--h-space-25` | 2px |
| `--h-space-50` | 4px |
| `--h-space-75` | 6px |
| `--h-space-100` | 8px |
| `--h-space-150` | 12px |
| `--h-space-200` | 16px |
| `--h-space-300` | 24px |
| `--h-space-400` | 32px |

```tsx
function MyChartWrapper() {
  return (
    <ThirdPartyChart
      style={{ padding: 'var(--h-space-300)' }}
    />
  );
}
```

This works for any component that forwards the `style` prop to a DOM element. The browser resolves the CSS variable at paint time, so you stay fully in sync with any future token value changes.

### Option B: Use `spaceTokens` from the package for type-safe token names

`@utilitywarehouse/hearth-react` exports the `spaceTokens` array — the canonical list of all valid space scale values:

```ts
import { spaceTokens } from '@utilitywarehouse/hearth-react';
// spaceTokens = ['0', '25', '50', '75', '100', '150', '175', '200', '250', '300', '350', '400', '500', '600', '700', '800', '900', '1000']
```

You can use this to build a type-safe helper that converts a token name into the CSS variable string:

```tsx
import { spaceTokens } from '@utilitywarehouse/hearth-react';

type SpaceToken = (typeof spaceTokens)[number]; // '0' | '25' | '50' | ...

function spaceVar(token: SpaceToken): string {
  return `var(--h-space-${token})`;
}

function MyChartWrapper() {
  return (
    <ThirdPartyChart
      style={{
        padding: spaceVar('300'),       // 'var(--h-space-300)' → 24px
        paddingInline: spaceVar('200'), // 'var(--h-space-200)' → 16px
      }}
    />
  );
}
```

### Option C: Read the resolved pixel value at runtime (only if the third-party component requires a number)

Some third-party chart libraries (e.g. Recharts, Victory) pass padding as a plain number, not a CSS string. In that case you need to resolve the CSS variable to a pixel value at runtime using `getComputedStyle`:

```tsx
import { useEffect, useState } from 'react';

function useSpaceToken(token: string): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue(`--h-space-${token}`)
      .trim(); // e.g. '24px'

    setValue(parseInt(raw, 10)); // 24
  }, [token]);

  return value;
}

function MyChartWrapper() {
  const padding = useSpaceToken('300'); // 24

  return (
    <ThirdPartyChart
      margin={{ top: padding, right: padding, bottom: padding, left: padding }}
    />
  );
}
```

Use Option C only when the third-party component cannot accept a CSS string — it involves a runtime DOM read and an extra render cycle. Options A and B are always preferable when the component can accept a CSS value.

---

## Summary

| Situation | Recommended approach |
|---|---|
| Custom `<div>` background | `style={{ backgroundColor: 'var(--h-surface-brand-default)' }}` or a CSS class using `var(--h-color-*)` / `var(--h-surface-*)` |
| Third-party component padding (accepts CSS string) | `style={{ padding: 'var(--h-space-300)' }}` — optionally built via the `spaceTokens` export for type safety |
| Third-party component padding (requires a number) | `getComputedStyle(document.documentElement).getPropertyValue('--h-space-300')` resolved to `parseInt` |

The key principle is that Hearth tokens are CSS custom properties on `:root` — they are globally available to any element and any inline style in your application, not just to Hearth components.
