# HighlightBanner

Promotional banner with a coloured heading and optional image.

```tsx
import { HighlightBanner } from '@utilitywarehouse/hearth-react';
```

| Prop | Values | Notes |
|---|---|---|
| `heading` | string | Required |
| `headingColor` | `'pig'` \| `'energy'` \| `'broadband'` \| `'mobile'` \| `'insurance'` \| `'cashback'` \| `'highlight'` | Required |
| `colorScheme` | `'neutralStrong'` \| `'neutralSubtle'` | Background colour |

```tsx
<HighlightBanner heading="Save a bundle" headingColor="highlight">
  <img src={SpotSavingsLight} alt="" role="presentation" />
</HighlightBanner>

<HighlightBanner
  heading="Get up to £150 in credit"
  headingColor="energy"
  colorScheme="neutralSubtle"
/>
```
