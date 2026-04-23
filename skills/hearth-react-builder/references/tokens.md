# Design Tokens

**Rule of priority:**
1. **Always use Hearth style props first** — `padding`, `gap`, `margin`, `color`, `borderRadius`, etc.
2. **If style props don't cover it**, use tokens in one of two ways:
   - **CSS file** → CSS custom properties: `var(--h-space-400)`
   - **Inline React styles** → browser format: `space[400]` (returns `"var(--h-space-400)"`)
3. **Never use the JS format** (`@utilitywarehouse/hearth-tokens/js`) — it returns raw values like `"32px"` which bypass the design system's theming.

Common cases where you need tokens directly: custom CSS pseudo-states (`:hover`, `:focus`), animations, styling non-Hearth elements, and third-party component overrides.

---

## Import formats

### CSS custom properties (when writing a CSS file)

```tsx
// In your app entry point — exposes all --h-* CSS variables globally
import '@utilitywarehouse/hearth-tokens/css';
```

Then use in `.css` files:
```css
.custom-element {
  padding: var(--h-space-400);
  color: var(--h-color-light-text-primary);
  border-radius: var(--h-border-radius-md);
}

.custom-element:hover {
  background-color: var(--h-color-light-interactive-neutral-surface-subtle-hover);
}
```

### Browser format (when writing inline React styles)

Returns CSS variable strings — e.g. `"var(--h-space-400)"`. Requires the CSS import above to be present so the variables resolve at runtime.

```tsx
import '@utilitywarehouse/hearth-tokens/css'; // required — resolves the variables
import { color, space, border } from '@utilitywarehouse/hearth-tokens/browser';

<div style={{
  padding: space[400],               // "var(--h-space-400)"
  color: color.light.text.primary,   // "var(--h-color-light-text-primary)"
  borderRadius: border.radius.md,    // "var(--h-border-radius-md)"
}} />
```

---

## Space tokens

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
| `--h-space-500` | 40px |
| `--h-space-600` | 48px |
| `--h-space-700` | 56px |
| `--h-space-800` | 64px |
| `--h-space-900` | 72px |
| `--h-space-1000` | 80px |

Note: Hearth style props (`padding="400"`, `gap="200"`) accept the numeric string directly without the `--h-space-` prefix.

---

## Border radius tokens

| Token | Value |
|---|---|
| `--h-border-radius-none` | 0px |
| `--h-border-radius-xs` | 4px |
| `--h-border-radius-sm` | 6px |
| `--h-border-radius-md` | 8px |
| `--h-border-radius-lg` | 12px |
| `--h-border-radius-xl` | 16px |
| `--h-border-radius-full` | 9999px |

---

## Semantic colour tokens

Semantic tokens adapt to light/dark themes. Always prefer these over primitive colour tokens in custom CSS.

**Naming pattern:** `--h-color-{theme}-{category}-{variant}`

### Text

```css
var(--h-color-light-text-primary)        /* Default body text */
var(--h-color-light-text-secondary)      /* Subdued / supporting text */
var(--h-color-light-text-inverted)       /* White text on dark backgrounds */
```

### Background

```css
var(--h-color-light-background-primary)  /* Page background */
var(--h-color-light-background-secondary)
var(--h-color-light-background-brand)    /* Brand-coloured background */
```

### Border

```css
var(--h-color-light-border-strong)       /* Prominent borders */
var(--h-color-light-border-subtle)       /* Subtle / divider borders */
```

### Focus

```css
var(--h-color-light-focus-primary)       /* Focus ring colour */
var(--h-color-light-focus-inverted)      /* Focus ring on dark backgrounds */
```

### Feedback (info / positive / warning / danger)

```css
/* Pattern: --h-color-light-feedback-{intent}-{surface|border|foreground}-{default|subtle} */
var(--h-color-light-feedback-danger-surface-default)
var(--h-color-light-feedback-danger-foreground-default)
var(--h-color-light-feedback-danger-border-default)
var(--h-color-light-feedback-positive-surface-default)
var(--h-color-light-feedback-info-surface-default)
var(--h-color-light-feedback-warning-surface-default)
```

### Interactive states

```css
/* Pattern: --h-color-light-interactive-{intent}-surface-{strength}-{state} */
var(--h-color-light-interactive-brand-surface-subtle-hover)
var(--h-color-light-interactive-brand-surface-subtle-active)
var(--h-color-light-interactive-neutral-surface-subtle-hover)
var(--h-color-light-interactive-destructive-surface-subtle-hover)
```

### Service surface colours

```css
var(--h-color-light-surface-energy-default)
var(--h-color-light-surface-broadband-default)
var(--h-color-light-surface-mobile-default)
var(--h-color-light-surface-insurance-default)
var(--h-color-light-surface-cashback-default)
var(--h-color-light-surface-brand-default)
var(--h-color-light-surface-highlight-default)
var(--h-color-light-surface-pig-default)
var(--h-color-light-surface-neutral-default)
var(--h-color-light-surface-neutral-subtle)
var(--h-color-light-surface-neutral-strong)
```

---

## Primitive colour scales (use sparingly)

Prefer semantic tokens. Use primitive scales only when no semantic token fits — e.g. for data visualisation or brand assets.

**Available scales:** `blue`, `broadband-green`, `cashback-lilac`, `energy-blue`, `green`, `grey`, `insurance-orange`, `mobile-rose`, `orange`, `piggy-pink`, `purple`, `red`, `warm-white`, `yellow`

Each scale has shades `0` through `1000`:
```css
var(--h-color-purple-800)
var(--h-color-grey-100)
var(--h-color-energy-blue-500)
```

---

## Font tokens

```css
/* Font families */
var(--h-font-family-body)           /* DM Sans — use for all UI text */
var(--h-font-family-detail)         /* DM Mono — monospace */
var(--h-font-family-heading)        /* Comic Hams — brand display only */

/* Font weights */
var(--h-font-weight-regular)        /* 400 */
var(--h-font-weight-medium)         /* 500 */
var(--h-font-weight-semibold)       /* 600 */
var(--h-font-weight-bold)           /* 700 */
var(--h-font-weight-heavy)          /* 900 */
```

---

## Component tokens

Each component has its own token namespace. These can be used to style wrapper elements or override component internals where necessary:

```css
/* Examples */
var(--h-button-border-radius)
var(--h-button-md-padding-horizontal)
var(--h-input-border-radius)
var(--h-card-border-radius)
var(--h-tooltip-max-width)
var(--h-tabs-item-padding-horizontal)
```

---

## Usage example — custom CSS alongside Hearth

```tsx
// MyCustomWidget.tsx
import '@utilitywarehouse/hearth-tokens/css';
import { Flex, BodyText } from '@utilitywarehouse/hearth-react';
import styles from './MyCustomWidget.css';

export function MyCustomWidget() {
  return (
    <Flex gap="300" className={styles.widget}>
      <BodyText size="md">Content here</BodyText>
    </Flex>
  );
}
```

```css
/* MyCustomWidget.css */
.widget {
  border: 1px solid var(--h-color-light-border-subtle);
  border-radius: var(--h-border-radius-lg);
  background-color: var(--h-color-light-surface-neutral-default);
}

.widget:hover {
  background-color: var(--h-color-light-interactive-neutral-surface-subtle-hover);
}

.widget:focus-within {
  outline: 2px solid var(--h-color-light-focus-primary);
  outline-offset: 2px;
}
```

---

## Dark theme

Replace `light` with `dark` in any semantic token name:

```css
/* Light */
var(--h-color-light-text-primary)
var(--h-color-light-surface-brand-default)

/* Dark equivalent */
var(--h-color-dark-text-primary)
var(--h-color-dark-surface-brand-default)
```

Apply dark tokens under a dark-mode class or media query:

```css
.my-element {
  background-color: var(--h-color-light-background-primary);
  color: var(--h-color-light-text-primary);
}

@media (prefers-color-scheme: dark) {
  .my-element {
    background-color: var(--h-color-dark-background-primary);
    color: var(--h-color-dark-text-primary);
  }
}
```
