---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `FormField`/`Helper`, `Badge` and `Tabs` icons now always have a colour

Some icons had no colour in certain states, so they fell back to `currentColor` and could render white or dark depending on the render:

- `Helper` (and `FormField`) custom helper icons with no validation status now use `color.icon.primary`.
- `Badge` icons with `variant="outline"` and a brand colour scheme (`energy`, `broadband`, `mobile`, `insurance`, `cashback`, `pig`, `highlight`) now use `color.text.primary`.
- `Tab` icons now use `color.icon.primary`.

**Developer changes**:

No action is required.
