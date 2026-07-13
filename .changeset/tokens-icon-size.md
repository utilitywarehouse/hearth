---
'@utilitywarehouse/hearth-tokens': patch
---

🌟 [FEATURE]: Add `icon` component tokens

New `icon` component tokens follow the standard component → variant → property
pattern: `icon.sm.width` / `icon.sm.height` (20, aliased to `{space.250}`) and
`icon.md.width` / `icon.md.height` (24, aliased to `{space.300}`). These match
the intrinsic sizes of the small and medium icon sets and are available in the
JS, CSS (`--h-icon-sm-width`, `--h-icon-md-height`, etc.) and browser outputs.
