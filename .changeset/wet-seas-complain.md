---
'@utilitywarehouse/hearth-tokens': minor
'@utilitywarehouse/hearth-react': minor
---

Refactor token CSS & Browser files. This is a breaking change, only affecting
usage of CSS and browser JS tokens.

- Individual component files have been combined into a single components tokens
    file.
- Typography and Device tokens (mobile, tablet & desktop) have been included in
    the components tokens file.
- Layout spacing tokens have been included in the space tokens file.
- Line-height & letter-spacing tokens have been included in the font tokens
    file.

There is now a more concise set of individual tokens files:

- border.{css,ts}
- color.{css,ts}
- components.{css,ts}
- font.{css,ts}
- semantic.{css,ts}
- space.{css,ts}

This change will only affect you if you are importing tokens via specific file
imports. This change does not affect you if you are importing the complete set
of design tokens from an index impyou if you are importing the complete set of
design tokens from an index import.
