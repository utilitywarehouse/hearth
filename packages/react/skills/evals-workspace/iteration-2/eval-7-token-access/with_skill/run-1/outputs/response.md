# Accessing Hearth Tokens Outside Hearth Components

There are two correct approaches depending on your use case.

## Case 1: Applying a token colour as a background on a custom `div` (CSS)

Use a CSS custom property in your stylesheet. All hearth CSS variables are always in scope from the hearth-react stylesheet — no import is required.

```css
.myDiv {
  background-color: var(--h-color-brand-purple-500);
}
```

Then apply the class to your div:

```tsx
<div className="myDiv">...</div>
```

The convention for colour tokens is `var(--h-color-<token-name>)`.

## Case 2: Using a token value as padding in a React inline style (e.g. on a third-party chart component)

When you need token values in JavaScript — such as in a `style` prop — import from `hearth-tokens/browser`, **not** from the `hearth-tokens` root. The root export is for Node/build-time use only and will not work correctly in a browser React context.

```tsx
import { space, color } from '@utilitywarehouse/hearth-tokens/browser';

<ThirdPartyChart style={{ padding: space[200] }} />
```

You can also access colour tokens the same way if needed for inline styles:

```tsx
<ThirdPartyChart style={{ padding: space[200], backgroundColor: color['brand-purple-500'] }} />
```

## Summary

| Situation | Correct approach |
|---|---|
| Custom `div` background in a CSS file | `var(--h-color-brand-purple-500)` — CSS custom property, no import needed |
| Inline `style` prop on any React element | `import { color, space } from '@utilitywarehouse/hearth-tokens/browser'` |

The key rule: **never** import from `@utilitywarehouse/hearth-tokens` (root) for browser/React use, and **never** use raw CSS values like `'#6B21A8'` or `'16px'` — always go through the token system.
