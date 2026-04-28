# Accessing Hearth Design Tokens

Hearth tokens are defined as CSS custom properties (CSS variables) prefixed with `--h-`. They are automatically included when you import the Hearth React stylesheet (`@utilitywarehouse/hearth-react/styles.css`). All token values — colours, space, typography, borders, and more — are available as CSS custom properties on `:root`.

There are two correct approaches depending on your use case.

---

## Case 1: Applying a token colour as a background on a custom `<div>` (CSS)

Because the token CSS is already included in the page when you use `@utilitywarehouse/hearth-react`, you can use any `--h-*` CSS custom property directly in your own stylesheets or CSS modules, without installing anything extra.

**CSS / CSS Module:**

```css
.my-custom-div {
  background-color: var(--h-surface-brand-default);
}
```

You can use any available colour token, including primitive colour tokens (`--h-color-purple-700`) or semantic tokens (`--h-background-primary`, `--h-surface-brand-default`, etc.). Prefer semantic tokens where appropriate.

Available semantic background tokens (from `semantic.css`) include:

- `--h-background-primary` — maps to `--h-color-warm-white-50`
- `--h-background-secondary` — maps to `--h-color-grey-0`
- `--h-background-brand` — maps to `--h-color-purple-700`
- `--h-surface-neutral-strong`, `--h-surface-brand-default`, etc.

Primitive colour tokens follow the pattern `--h-color-{palette}-{shade}`, e.g. `--h-color-green-500`.

---

## Case 2: Using a token value as padding in a React inline `style` prop (JavaScript/TypeScript)

React inline `style` props accept JavaScript strings, so you cannot use bare CSS variable references like `var(--h-space-300)` without wrapping them as a CSS value. The correct approach is to use the `@utilitywarehouse/hearth-tokens` package, specifically its **browser** entrypoint.

**Install the package:**

```console
npm install @utilitywarehouse/hearth-tokens
```

**Important:** Always import from `@utilitywarehouse/hearth-tokens/browser`, not the root or JS entrypoint. The browser tokens export CSS custom property references (e.g. `var(--h-space-300)`), rather than raw resolved values. This ensures your components stay in sync with the Hearth token system at runtime.

**Usage in a React inline style:**

```tsx
import { space, semantic } from '@utilitywarehouse/hearth-tokens/browser';

<ThirdPartyChart
  style={{
    padding: space[300],       // resolves to "var(--h-space-300)"
  }}
/>
```

You can also reference component-level or semantic tokens from the browser entrypoint:

```tsx
import { components, semantic } from '@utilitywarehouse/hearth-tokens/browser';

<ThirdPartyChart
  style={{
    padding: components.container.paddingBottom,
    backgroundColor: semantic.feedback.positive.surface.subtle,
  }}
/>
```

Alternatively, you can write the CSS variable reference directly as a string — this is also valid:

```tsx
<ThirdPartyChart
  style={{
    padding: 'var(--h-space-300)',
    backgroundColor: 'var(--h-surface-brand-default)',
  }}
/>
```

This works because CSS custom properties defined on `:root` cascade into inline styles, and browsers resolve `var()` at render time.

---

## Summary

| Use case | Approach |
|---|---|
| Custom `<div>` background via CSS / CSS Module | Use `var(--h-*)` directly in your stylesheet — no extra package needed |
| Third-party component `style` prop in React | Import from `@utilitywarehouse/hearth-tokens/browser` and use the JS token references, or write `'var(--h-*)'` string literals inline |

In both cases, the underlying token values are CSS custom properties defined in the Hearth token CSS, which is bundled into `@utilitywarehouse/hearth-react`'s stylesheet. Do not use raw hex values or px values directly — always reference tokens to stay consistent with the design system.
