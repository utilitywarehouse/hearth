---
'@utilitywarehouse/hearth-codemod': minor
---

🌟 [FEATURE]: `react/v1/remove-text-wrap-prop` codemod available

Renames the deprecated `wrap` prop to `textWrap` on `BodyText`, `Heading`,
`Strong`, `Em` and `DetailText`. Where an element has both `wrap` and
`textWrap`, or `wrap` may arrive through a prop spread, the element is left
unchanged and a warning is printed for manual review.

```sh
npx @utilitywarehouse/hearth-codemod react/v1/remove-text-wrap-prop <path>
```

It is also included in `react/v1/migration`. See the
[`v1` migration guide](../packages/react/docs/migration/v1.docs.mdx) for details.
