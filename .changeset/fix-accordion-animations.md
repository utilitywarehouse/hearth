---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: `Accordion` open and close animations not playing

The panel animations stopped playing after the move to Base UI, so accordions
snapped open and shut. They now animate the panel height again, and are still
disabled when the user prefers reduced motion.

**Components affected**:
- `Accordion`
