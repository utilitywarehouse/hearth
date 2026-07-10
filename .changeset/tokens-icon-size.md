---
'@utilitywarehouse/hearth-tokens': patch
---

🌟 [FEATURE]: Add `icon` component tokens

New `icon` component tokens follow the standard component → variant → property
pattern: `icon.sm.width` / `icon.sm.height` (20, aliased to `{space.250}`) and
`icon.md.width` / `icon.md.height` (24, aliased to `{space.300}`). These match
the intrinsic sizes of the small and medium icon sets and are available in the
JS, CSS (`--h-icon-sm-width`, `--h-icon-md-height`, etc.) and browser outputs.

Note: these tokens are being mirrored in the Figma variables collection so the
next Figma export retains them.

Also tightens the per-component filter in the JS token generator: it previously
matched any token whose path contained the component name anywhere, which
copied other components' nested sub-tokens into unrelated files. This removes
the duplicated `iconButton`, `link`, `list`, `banner` and `divider` keys that
were nested inside `icon-button.ts`, `link.ts`, `list.ts`, `banner.ts` and
`divider.ts` — the tokens remain in their owning component files
(`alert`, `menu`, `card-content`, `tabs`).
