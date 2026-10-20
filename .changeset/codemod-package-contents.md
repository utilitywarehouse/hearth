---
'@utilitywarehouse/hearth-codemod': patch
---

🐛 [BUG FIX]: The published `hearth-codemod` package ships its own tests and fixtures

`src/transforms` was published whole, including `__tests__` and
`__testfixtures__`. The package now ships only the transforms and the helpers
they import, and a smoke test runs the built CLI against a fixture directory.
