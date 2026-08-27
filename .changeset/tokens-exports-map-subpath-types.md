---
'@utilitywarehouse/hearth-tokens': patch
---

🐛 [FIX]: Deep subpath imports (e.g. `@utilitywarehouse/hearth-tokens/browser/semantic`) fail to resolve types under strict module resolution (`bundler`, `node16`, `nodenext`)

The `./browser/*` and `./js/*` entries in the package's `exports` map used bare
wildcard pass-throughs, so under `moduleResolution: "node"` (which ignores
`exports`) they worked by accident, but under `"bundler"`, `"node16"`, or
`"nodenext"` the wildcard substitution produced an extensionless path with no
matching file on disk. These entries now explicitly map to `.d.ts`/`.js` files,
so extensionless deep subpath imports resolve correctly under all resolution
modes. A dedicated `*.js` pattern is matched first, so imports that already
include the `.js` extension continue to resolve as before.
