---
'@utilitywarehouse/hearth-react': patch
---

💅 [ENHANCEMENT]: `init-ai` script resolves correct skill path in monorepos

In monorepos where `@utilitywarehouse/hearth-react` is hoisted to the root
`node_modules`, the `init-ai` script was writing an incorrect local path to AI
assistant config files.

The script now walks up the directory tree from the project root to find where
the package is actually installed, and writes a path relative to the project
root. The SKILL.md documentation has also been updated to guide agents to
resolve the package location at runtime rather than assuming a fixed relative
path.

**Developer changes**:

No changes required. Re-run `npx @utilitywarehouse/hearth-react init-ai` to
update your config file with the correct path if you previously ran it from
within a monorepo app.
