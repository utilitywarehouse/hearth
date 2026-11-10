---
'@utilitywarehouse/hearth-codemod': patch
---

🌟 [FEATURE]: `react/v1/migrate-card-banner-image` codemod available

Renames `CardBannerImage` to `BannerImage`, including aliased and namespace imports. If `BannerImage` is already imported, the duplicate import is dropped.

```sh
npx @utilitywarehouse/hearth-codemod react/v1/migrate-card-banner-image <path>
```

It is also included in `react/pre-v1/migration` and `react/v1/migration`. See the
[`v1` migration guide](../packages/react/docs/migration/v1.docs.mdx) for details.
