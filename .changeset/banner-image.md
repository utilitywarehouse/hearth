---
'@utilitywarehouse/hearth-react': patch
---

🌟 [FEATURE]: Add `BannerImage` component and deprecate `CardBannerImage`

`BannerImage` wraps a banner image with a border and rounded corners. Use it in the `image` prop of `Modal` (with `imageSize="lg"`) or alongside `CardBannerContent` in a `Card`. `CardBannerImage` is deprecated and will be removed in v1.

```tsx
<BannerImage width="160px" height="174px">
  <img src={banner} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
</BannerImage>
```

**Components affected**:

- `BannerImage` (new)
- `CardBannerImage` (deprecated)

**Developer changes**:

Replace `CardBannerImage` with `BannerImage`. A codemod will follow before `CardBannerImage` is removed in v1.
