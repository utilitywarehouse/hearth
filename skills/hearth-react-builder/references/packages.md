# Packages & Setup

## Core packages

| Package | Purpose |
|---|---|
| `@utilitywarehouse/hearth-react` | All React components |
| `@utilitywarehouse/hearth-fonts` | Fonts: DM Sans, DM Mono, Comic Hams |
| `@utilitywarehouse/hearth-css-reset` | Minimal CSS reset |

## Optional packages

| Package | Purpose |
|---|---|
| `@utilitywarehouse/hearth-react-icons` | 189 icon components |
| `@utilitywarehouse/hearth-svg-assets` | 188 SVG illustrations, logos, mascots, scenes |
| `@utilitywarehouse/hearth-json-assets` | 44 Lottie animated illustrations |
| `@utilitywarehouse/hearth-tokens` | Raw design tokens |

## App entry point

```tsx
// main.tsx or index.tsx
import '@utilitywarehouse/hearth-fonts';
import '@utilitywarehouse/hearth-css-reset';
import { HearthProvider } from '@utilitywarehouse/hearth-react';

function App() {
  return (
    <HearthProvider>
      {/* app content */}
    </HearthProvider>
  );
}
```

`HearthProvider` must wrap the app root — required for `Toast` and other context-dependent components.

## Import patterns

```tsx
// Components — named imports from the main package
import { Button, Flex, Heading, TextInput, Card } from '@utilitywarehouse/hearth-react';

// Icons — naming convention: {Name}{Size}Icon (sizes: Small, Medium, Large)
import { ChevronRightSmallIcon, AddMediumIcon, UserMediumIcon } from '@utilitywarehouse/hearth-react-icons';

// SVG assets — individual file imports
import LogoFullPurple from '@utilitywarehouse/hearth-svg-assets/lib/logo-full-purple.svg';
import SpotSavingsLight from '@utilitywarehouse/hearth-svg-assets/lib/spot-savings-light.svg';

// Animated Lottie illustrations — use with lottie-react
import SpotProcessComplete from '@utilitywarehouse/hearth-json-assets/lib/spot-process-complete-functional.json';
// <Lottie animationData={SpotProcessComplete} />

// Design tokens — use CSS vars in .css files, browser format for inline React styles
// (style props should always be tried first — see references/tokens.md)
import '@utilitywarehouse/hearth-tokens/css';                           // exposes --h-* CSS variables
import { color, space } from '@utilitywarehouse/hearth-tokens/browser'; // returns CSS var strings for inline styles
```

## Breakpoints & responsive utilities

```tsx
import { breakpoints, media, useMediaQuery } from '@utilitywarehouse/hearth-react';
```

Responsive prop keys (smallest to largest): `mobile`, `tablet`, `desktop`, `wide`.

## Spacing scale

Hearth uses a numeric token scale for all spacing props (`gap`, `padding`, `margin`, etc.):

`100` `150` `200` `300` `400` `500` `600` `700` `800` `900` `1000`

Always pass token strings, not raw pixel values: `gap="400"` not `gap="16px"`.

## Fonts

- **DM Sans** — primary UI font (loaded automatically)
- **DM Mono** — monospace
- **Comic Hams** — UW brand display font (marketing/hero use only)

Fonts load via CSS when you `import '@utilitywarehouse/hearth-fonts'` in the app entry point.
