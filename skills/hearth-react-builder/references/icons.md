# Icons, SVG Assets & Illustrations

## React Icons (`@utilitywarehouse/hearth-react-icons`)

189 icons available as React SVG components.

**Naming convention:** `{Name}{Size}Icon`
- Sizes: `Small`, `Medium`, `Large`
- Examples: `AddMediumIcon`, `ChevronRightSmallIcon`, `UserMediumIcon`, `SettingsSmallIcon`

```tsx
import { AddMediumIcon, ChevronRightSmallIcon, TrashSmallIcon } from '@utilitywarehouse/hearth-react-icons';

// Standalone icon — must have title for accessibility
<AddMediumIcon title="Add new item" titleId="add-new-item" />

// Decorative icon inside a labelled button — no title needed
<Button variant="solid" colorScheme="highlight">
  <AddMediumIcon />
  Add item
</Button>

// Icon-only button — use IconButton, not a raw icon
<IconButton label="Delete" variant="ghost" colorScheme="functional">
  <TrashSmallIcon />
</IconButton>
```

**Accessibility:**
- **Standalone icon** (no surrounding label): provide `title` and `titleId`
- **Icon inside a labelled button/link**: omit `title` — the surrounding label provides the accessible name
- **Purely decorative**: `aria-hidden="true"`

**Sizing guide:**
- `Small` — tight UI, inline with small text, trailing chevrons
- `Medium` — standard buttons, navigation, most UI contexts
- `Large` — hero icons, empty states, feature highlights

---

## SVG Assets (`@utilitywarehouse/hearth-svg-assets`)

188 SVG files — logos, mascots, spot illustrations, and scene illustrations.

**Asset types:**
- **Logos:** `logo-full-purple.svg`, `logo-condensed-*.svg`
- **Mascots:** `mascot-{service}-{theme}.svg` (e.g. `mascot-broadband-light.svg`)
- **Scenes:** `scene-{service}-{theme}.svg` (e.g. `scene-bundle-dark.svg`)
- **Spots:** `spot-{name}-{theme}.svg` — smaller illustrations for cards and empty states

**Themes:** `light` or `dark` variants available for most assets. Use `light` on light backgrounds, `dark` on dark backgrounds.

```tsx
import LogoFullPurple from '@utilitywarehouse/hearth-svg-assets/lib/logo-full-purple.svg';
import SpotSavingsLight from '@utilitywarehouse/hearth-svg-assets/lib/spot-savings-light.svg';
import MascotBroadbandLight from '@utilitywarehouse/hearth-svg-assets/lib/mascot-broadband-light.svg';

// Logo — needs descriptive alt text
<img src={LogoFullPurple} alt="Utility Warehouse" />

// Decorative illustration — alt="" is correct here
<img src={SpotSavingsLight} alt="" role="presentation" />

// Inside a Card
<CardBannerImage width="160px" height="174px">
  <img src={MascotBroadbandLight} style={{ objectFit: 'cover' }} alt="" />
</CardBannerImage>
```

**Accessibility:** Use descriptive `alt` text for logos and meaningful images. For purely decorative spot/scene illustrations, `alt=""` is correct.

---

## Animated Illustrations (`@utilitywarehouse/hearth-json-assets`)

44 Lottie JSON animations. Use with the `lottie-react` package.

```tsx
import Lottie from 'lottie-react';
import SpotProcessComplete from '@utilitywarehouse/hearth-json-assets/lib/spot-process-complete-functional.json';
import AnimatedBillingLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-billing-light.json';

<Lottie animationData={SpotProcessComplete} style={{ width: 200, height: 200 }} />
```

Available categories: account, billing, empty states, process complete, and service-specific spots.

**Gotchas:**
- Lottie animations can be large — only use where motion adds genuine value (success states, loading transitions)
- Always respect `prefers-reduced-motion` — check `useMediaQuery` and fall back to a static image if motion is reduced

---

## IconContainer

Renders an icon inside a styled container with a brand colour background. Used in cards, list items, and navigation.

```tsx
import { IconContainer } from '@utilitywarehouse/hearth-react';
import { ElectricityMediumIcon } from '@utilitywarehouse/hearth-react-icons';

// Standard
<IconContainer colorScheme="energy">
  <ElectricityMediumIcon />
</IconContainer>

// Full-height (stretches to fill parent, removes border radius — for card edges)
<IconContainer colorScheme="broadband" fill="height" borderRadius="none">
  <BroadbandMediumIcon />
</IconContainer>
```

| Prop | Values |
|---|---|
| `colorScheme` | `'energy'` \| `'broadband'` \| `'mobile'` \| `'insurance'` \| `'cashback'` \| `'functional'` \| `'highlight'` \| `'pig'` |
| `fill` | `'height'` — stretches vertically to fill parent |
| `borderRadius` | `'none'` or default rounded |

**Gotcha:** When using `fill="height"` inside a card, set `paddingNone` on the parent `Card` so the container reaches the card edges.

---

## Fonts

Available via `@utilitywarehouse/hearth-fonts`. Import once in the app entry point.

| Font | Use case |
|---|---|
| **DM Sans** | All UI text — loaded automatically by Hearth components |
| **DM Mono** | Code snippets, monospace content |
| **Comic Hams** | UW brand/marketing display text only — not for functional UI |
