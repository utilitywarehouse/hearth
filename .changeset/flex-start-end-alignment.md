---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: Consumer builds log autoprefixer "mixed support" warnings for `styles.css`

Several flex containers used `start` and `end` alignment values, which
autoprefixer flags as having mixed browser support in flex layouts. Apps that
run `styles.css` through autoprefixer (for example, every Next.js app) logged
six warnings on each compile. These now use `flex-start` and `flex-end`, which
lay out identically in these containers.

**Components affected**:

- `Alert`
- `CardAccordion`
- `CardActionContent`
- `CheckboxTile`
- `List`
- `Modal`

**Developer changes**:

No changes required.
