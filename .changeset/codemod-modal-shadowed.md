---
'@utilitywarehouse/hearth-codemod': patch
---

🐛 [BUG FIX]: Modal codemods rewrite a local `Modal` that shadows the Hearth import

In a file that imported Hearth's `Modal`, a function parameter or inner
component also named `Modal` had its `loadingText` or `fullScreen` rewritten.
The codemods now only touch tags that resolve to the Hearth import.
