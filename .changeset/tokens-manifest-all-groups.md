---
'@utilitywarehouse/hearth-tokens': minor
---

🌟 [ENHANCEMENT]: `hearth-manifest.json` covers every token group, with per-device entries and CSS values

The manifest now lists the space, border, font, letter-spacing, line-height, layout,
shadow, typography, opacity and component tokens as well as colours. Each entry has
the same CSS, browser and JS paths as before, and:

- **`device`**: tokens whose value depends on the device (layout, shadow, typography
  and some component tokens) have one entry per `mobile`, `tablet` and `desktop`.
- **`surfaces.css.value`**: the value the stylesheet declares (`8px`, `1rem`, `0.5`),
  which differs from the JS value (`8`, `16`, `50`).
- **Component dark values**: component tokens carry their dark value and JS `darkPath`.

Shadows and typography styles are listed one entry per part (`semantic.shadow.md.x`),
so every value is a string or a number.

**Developer changes**:

No action is required. The manifest is read by tooling, and the existing CSS, browser
and JS exports are unchanged. The optional `device` and `css.value` fields are additive,
so `schemaVersion` stays `1`; a CLI built before this release reads the manifest but
lists each device variant separately.
