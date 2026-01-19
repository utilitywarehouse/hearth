---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: Modal content spacing when `description` is not used.

Ideally users should use the `description` prop for modal content, but in cases
where they don't, we need to ensure proper spacing is maintained. This fix
doesn't require any changes from the users' side.
