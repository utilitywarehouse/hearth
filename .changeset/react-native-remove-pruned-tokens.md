---
'@utilitywarehouse/hearth-react-native': minor
---

💔 [BREAKING_CHANGE]: Remove pruned design tokens from React Native token exports

Several unused design tokens have been removed from the React Native token exports
to align with the updated design token set.

**Tokens removed**:

- `borderRadius.lg`
- `color`: multiple shades pruned across all colour palettes (`blue`, `broadbandGreen`, `cashbackLilac`, `energyBlue`, `green`, `insuranceOrange`, `mobileRose`, `orange`, `piggyPink`, `purple`, `red`, `warmWhite`, `yellow`)
- `font.size`: `50`, `75`, `600`, `700`, `800`, `900`, `1000`
- `font.weight.heavy`
- `letterSpacing`: `0`, `50`, `75`, `550`, `600`, `700`, `800`, `900`, `1000`
- `lineHeight`: `50`, `75`, `100`, `900`, `1000`, `1100`, `1200`
- `space['1000']`

**Developer changes**:

If you are referencing any of the removed tokens directly, replace them with the
nearest available equivalent or remove the usage.

For example:

```diff
- borderRadius: tokens.borderRadius.lg,
+ borderRadius: tokens.borderRadius.md,
```

```diff
- fontSize: tokens.font.size[50],
+ fontSize: tokens.font.size[90],
```

```diff
- fontWeight: tokens.font.weight.heavy,
+ fontWeight: tokens.font.weight.bold,
```
