---
'@utilitywarehouse/hearth-react-native': patch
---

🧹 [HOUSEKEEPING]: Explicit `files` allowlist for published npm package

`package.json` previously had no `files` array and no `.npmignore`, so the
published package relied on npm's default gitignore-based inclusion rules.
`files` is now set to `["build/**"]`, matching the intent of the existing
`/build` `.gitignore` entry and mirroring the explicit allowlist already used
by `@utilitywarehouse/hearth-react`.

**Developer changes**:

No changes required for consumers using the package's public entry point.
