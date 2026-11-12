---
'@utilitywarehouse/hearth-react-native': major
---

💔 [BREAKING CHANGE]: `Input` no longer defaults `required` to `true`

`Input` destructured `required = true`, so the `required ?? formFieldContext?.required` fallback never ran and a parent `FormField`'s `required` was ignored. The default is removed, matching `Textarea`. An `Input` is now optional unless you pass `required` or wrap it in a `FormField` with `required`.

**Developer changes**:

If you relied on the old default, set it explicitly:

```diff
-<Input label="Name" />
+<Input label="Name" required />
```
