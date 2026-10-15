---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `Icon` defaults to `color.icon.primary`, and `FormField`/`Helper`, `Badge` and `Tabs` icons always have a colour

Icons fill with `currentColor`. When nothing set a colour, that had nothing to resolve against, so icons could render white or dark depending on the render.

- `Icon` now uses `color.icon.primary` when no `color`, `fill` or `stroke` prop and no `style.color` is set. Any of those still overrides it.
- `Helper` (and `FormField`) custom helper icons with no validation status now use `color.icon.primary`.
- `Badge` icons with `variant="outline"` and a brand colour scheme (`energy`, `broadband`, `mobile`, `insurance`, `cashback`, `pig`, `highlight`) now use `color.text.primary`.
- `Tab` icons now use `color.icon.primary`.

**Developer changes**:

No action is required. To keep an icon in a different colour, pass `color` (or `fill`/`stroke`) to `Icon`.
