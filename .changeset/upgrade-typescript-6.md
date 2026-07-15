---
'@utilitywarehouse/hearth-react': patch
'@utilitywarehouse/hearth-react-icons': patch
'@utilitywarehouse/hearth-react-native': patch
'@utilitywarehouse/hearth-react-native-icons': patch
'@utilitywarehouse/hearth-tokens': patch
---

📦 [DEPS]: Upgrade TypeScript to 6.0.3

Updated TypeScript from 5.x to 6.0.3 across the monorepo, and cleaned up
compiler options deprecated since TypeScript 5.0 (`ignoreDeprecations`,
`noImplicitUseStrict`, `noStrictGenericChecks`) and 6.0 (`moduleResolution:
node`, `baseUrl` as a module resolution root).

**Developer changes**:

No changes required. Published output (JS bundles and `.d.ts` declarations) is
unaffected — this is a devDependency and tooling upgrade only.
