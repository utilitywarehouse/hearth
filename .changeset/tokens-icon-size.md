---
'@utilitywarehouse/hearth-tokens': patch
---

🌟 [FEATURE]: Add `icon-size` component tokens

New `icon-size` tokens define the design system's two icon sizes: `sm` (20,
aliased to `{space.250}`) and `md` (24, aliased to `{space.300}`). These match
the intrinsic sizes of the small and medium icon sets and are available in the
JS, CSS (`--h-icon-size-sm` / `--h-icon-size-md`) and browser outputs.

Note: these tokens were added in code and should be mirrored in the Figma
variables collection so the next Figma export retains them.
