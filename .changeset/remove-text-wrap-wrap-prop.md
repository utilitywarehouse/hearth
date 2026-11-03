---
'@utilitywarehouse/hearth-react': major
---

💥 [BREAKING]: remove deprecated `wrap` prop from `BodyText`, `Heading`, `Strong`, `Em` and `DetailText`

The deprecated `wrap` prop has been removed. Use `textWrap` instead.

```diff
- <BodyText wrap="balance">
+ <BodyText textWrap="balance">
```

Migrate automatically with the codemod:

```sh
npx @utilitywarehouse/hearth-codemod react/v1/remove-text-wrap-prop <path>
```
