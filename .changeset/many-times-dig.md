---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: Deprecate incorrectly named `wrap` prop

The `TextWrap` prop was incorrectly named `wrap` in the `Text` component. This
patch deprecates the `wrap` prop and introduces the correctly named `textWrap`
prop. The `wrap` prop will be removed in a future major version.

```diff
- <BodyText wrap="pretty">...</BodyText>
+ <BodyText textWrap="pretty">...</BodyText>
```

## Components Affected

- `Heading`
- `BodyText`
- `DetailText`
- `Em`
- `Strong`
