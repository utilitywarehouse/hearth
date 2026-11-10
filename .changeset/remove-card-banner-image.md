---
'@utilitywarehouse/hearth-react': major
---

💔 [BREAKING CHANGE]: `CardBannerImage` removed in favour of `BannerImage`

`CardBannerImage` was a deprecated wrapper around `BannerImage` and has been removed. Use `BannerImage`, which has the same props.

```diff
- import { CardBannerImage } from '@utilitywarehouse/hearth-react';
+ import { BannerImage } from '@utilitywarehouse/hearth-react';

- <CardBannerImage width="160px" height="174px">
+ <BannerImage width="160px" height="174px">
    <img src={banner} alt="" />
- </CardBannerImage>
+ </BannerImage>
```

Run the codemod to rename usages:

```sh
npx @utilitywarehouse/hearth-codemod react/v1/migrate-card-banner-image <path>
```

See the [`v1` migration guide](../packages/react/docs/migration/v1.docs.mdx) for details.
